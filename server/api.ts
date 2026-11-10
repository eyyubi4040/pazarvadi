import { db } from "./db";
import { join, extname } from "path";
import { existsSync, mkdirSync, writeFileSync } from "fs";

// Helper: JSON Response
function jsonResponse(data: any, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
      ...headers
    }
  });
}

// Simple Session Management (In-memory + token)
const sessions = new Map<string, { userId: number; role: string; email: string; name: string }>();

function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function getAuthenticatedUser(req: Request) {
  const authHeader = req.headers.get("Authorization");
  const cookieHeader = req.headers.get("Cookie");

  let token = "";
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7);
  } else if (cookieHeader) {
    const match = cookieHeader.match(/pzr_session=([^;]+)/);
    if (match) token = match[1];
  }

  if (!token) return null;
  return sessions.get(token) || null;
}

export async function handleApi(req: Request, url: URL): Promise<Response> {
  const pathname = url.pathname;
  const method = req.method;

  // Handle CORS preflight
  if (method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
      }
    });
  }

  try {
    // ----------------------------------------------------
    // 1. PUBLIC STORE SETTINGS
    // ----------------------------------------------------
    if (pathname === "/api/settings" && method === "GET") {
      const rows = db.query("SELECT key, value FROM settings").all() as any[];
      const settingsMap: Record<string, string> = {};
      for (const r of rows) settingsMap[r.key] = r.value;
      return jsonResponse({ success: true, settings: settingsMap });
    }

    // ----------------------------------------------------
    // 2. CATEGORIES
    // ----------------------------------------------------
    if (pathname === "/api/categories" && method === "GET") {
      const categories = db.query(`
        SELECT c.*, COUNT(p.id) as product_count
        FROM categories c
        LEFT JOIN products p ON p.category_id = c.id AND p.is_active = 1
        WHERE c.is_active = 1
        GROUP BY c.id
        ORDER BY c.display_order ASC
      `).all();
      return jsonResponse({ success: true, categories });
    }

    // ----------------------------------------------------
    // 3. PRODUCTS LIST & FILTERING
    // ----------------------------------------------------
    if (pathname === "/api/products" && method === "GET") {
      const categorySlug = url.searchParams.get("category");
      const q = url.searchParams.get("q") || "";
      const minPrice = Number(url.searchParams.get("min_price")) || 0;
      const maxPrice = Number(url.searchParams.get("max_price")) || 999999;
      const sort = url.searchParams.get("sort") || "featured";
      const featured = url.searchParams.get("featured");
      const bestseller = url.searchParams.get("bestseller");
      const badge = url.searchParams.get("badge");
      const inStock = url.searchParams.get("in_stock");
      const limit = Math.min(Number(url.searchParams.get("limit")) || 24, 100);
      const page = Math.max(Number(url.searchParams.get("page")) || 1, 1);
      const offset = (page - 1) * limit;

      let whereConditions = ["p.is_active = 1"];
      const params: any[] = [];

      if (categorySlug) {
        whereConditions.push("(c.slug = ? OR c.id = ?)");
        params.push(categorySlug, categorySlug);
      }

      if (q.trim()) {
        whereConditions.push("(p.name LIKE ? OR p.short_desc LIKE ? OR p.description LIKE ? OR p.sku LIKE ?)");
        const searchPattern = `%${q.trim()}%`;
        params.push(searchPattern, searchPattern, searchPattern, searchPattern);
      }

      if (minPrice > 0) {
        whereConditions.push("p.price >= ?");
        params.push(minPrice);
      }
      if (maxPrice < 999999) {
        whereConditions.push("p.price <= ?");
        params.push(maxPrice);
      }
      if (featured === "1" || featured === "true") {
        whereConditions.push("p.is_featured = 1");
      }
      if (bestseller === "1" || bestseller === "true") {
        whereConditions.push("p.is_bestseller = 1");
      }
      if (badge) {
        whereConditions.push("p.badge = ?");
        params.push(badge);
      }
      if (inStock === "1" || inStock === "true") {
        whereConditions.push("p.stock > 0");
      }

      let orderBy = "p.is_featured DESC, p.id DESC";
      if (sort === "price_asc") orderBy = "p.price ASC";
      else if (sort === "price_desc") orderBy = "p.price DESC";
      else if (sort === "rating") orderBy = "p.rating DESC";
      else if (sort === "newest") orderBy = "p.id DESC";
      else if (sort === "popular") orderBy = "p.is_bestseller DESC, p.review_count DESC";

      const whereClause = whereConditions.join(" AND ");

      const countSql = `
        SELECT COUNT(p.id) as total
        FROM products p
        LEFT JOIN categories c ON c.id = p.category_id
        WHERE ${whereClause}
      `;
      const countRes = db.prepare(countSql).get(...params) as any;
      const total = countRes?.total || 0;

      const listSql = `
        SELECT p.*, c.name as category_name, c.slug as category_slug
        FROM products p
        LEFT JOIN categories c ON c.id = p.category_id
        WHERE ${whereClause}
        ORDER BY ${orderBy}
        LIMIT ? OFFSET ?
      `;
      const products = db.prepare(listSql).all(...params, limit, offset) as any[];

      // Parse JSON strings
      for (const p of products) {
        try { p.images = JSON.parse(p.images || "[]"); } catch { p.images = []; }
        try { p.specs = JSON.parse(p.specs || "{}"); } catch { p.specs = {}; }
      }

      return jsonResponse({
        success: true,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        products
      });
    }

    // ----------------------------------------------------
    // 4. SINGLE PRODUCT DETAIL & RELATED
    // ----------------------------------------------------
    if (pathname.startsWith("/api/products/") && method === "GET") {
      const idOrSlug = pathname.replace("/api/products/", "").trim();
      let product: any = null;

      if (/^\d+$/.test(idOrSlug)) {
        product = db.prepare(`
          SELECT p.*, c.name as category_name, c.slug as category_slug
          FROM products p
          LEFT JOIN categories c ON c.id = p.category_id
          WHERE p.id = ? AND p.is_active = 1
        `).get(Number(idOrSlug));
      } else {
        product = db.prepare(`
          SELECT p.*, c.name as category_name, c.slug as category_slug
          FROM products p
          LEFT JOIN categories c ON c.id = p.category_id
          WHERE p.slug = ? AND p.is_active = 1
        `).get(idOrSlug);
      }

      if (!product) {
        return jsonResponse({ success: false, message: "Ürün bulunamadı" }, 404);
      }

      try { product.images = JSON.parse(product.images || "[]"); } catch { product.images = []; }
      try { product.specs = JSON.parse(product.specs || "{}"); } catch { product.specs = {}; }

      // Get reviews
      const reviews = db.prepare(`
        SELECT id, user_name, rating, comment, is_verified, created_at
        FROM reviews
        WHERE product_id = ? AND is_approved = 1
        ORDER BY id DESC
      `).all(product.id);

      // Get related products (same category)
      const related = db.prepare(`
        SELECT id, name, slug, price, compare_at_price, badge, rating, review_count, images
        FROM products
        WHERE category_id = ? AND id != ? AND is_active = 1
        LIMIT 4
      `).all(product.category_id, product.id) as any[];

      for (const r of related) {
        try { r.images = JSON.parse(r.images || "[]"); } catch { r.images = []; }
      }

      return jsonResponse({
        success: true,
        product,
        reviews,
        related
      });
    }

    // ----------------------------------------------------
    // 5. COUPON VALIDATION
    // ----------------------------------------------------
    if (pathname === "/api/coupons/validate" && method === "POST") {
      const body = await req.json().catch(() => ({}));
      const code = (body.code || "").toUpperCase().trim();
      const subtotal = Number(body.subtotal) || 0;

      if (!code) {
        return jsonResponse({ success: false, message: "Lütfen kupon kodunu giriniz." }, 400);
      }

      const coupon = db.prepare(`
        SELECT * FROM coupons
        WHERE UPPER(code) = ? AND is_active = 1
      `).get(code) as any;

      if (!coupon) {
        return jsonResponse({ success: false, message: "Geçersiz veya süresi dolmuş kupon kodu." }, 400);
      }

      if (coupon.min_spend && subtotal < coupon.min_spend) {
        return jsonResponse({
          success: false,
          message: `Bu kupon en az ₺${coupon.min_spend.toFixed(2)} tutarındaki siparişlerde geçerlidir.`
        }, 400);
      }

      if (coupon.usage_limit && coupon.usage_count >= coupon.usage_limit) {
        return jsonResponse({ success: false, message: "Bu kuponun kullanım limiti dolmuştur." }, 400);
      }

      let discountAmount = 0;
      if (coupon.discount_type === "percent") {
        discountAmount = (subtotal * coupon.discount_value) / 100;
        if (coupon.max_discount && discountAmount > coupon.max_discount) {
          discountAmount = coupon.max_discount;
        }
      } else {
        discountAmount = coupon.discount_value;
      }

      discountAmount = Math.min(discountAmount, subtotal);

      return jsonResponse({
        success: true,
        coupon: {
          code: coupon.code,
          discount_type: coupon.discount_type,
          discount_value: coupon.discount_value,
          discount_amount: Math.round(discountAmount * 100) / 100
        },
        message: "Kupon başarıyla uygulandı!"
      });
    }

    // ----------------------------------------------------
    // 6. ORDER CREATION
    // ----------------------------------------------------
    if (pathname === "/api/orders" && method === "POST") {
      const body = await req.json().catch(() => ({}));
      const {
        items,
        customer,
        shipping,
        payment,
        coupon_code
      } = body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return jsonResponse({ success: false, message: "Sepetiniz boş." }, 400);
      }

      if (!customer?.name || !customer?.email || !customer?.phone || !shipping?.address || !shipping?.city) {
        return jsonResponse({ success: false, message: "Lütfen tüm teslimat ve iletişim bilgilerini doldurunuz." }, 400);
      }

      // Calculate subtotal from database prices to avoid client tampering
      let subtotal = 0;
      const validatedItems: any[] = [];

      for (const item of items) {
        const prod = db.prepare("SELECT id, name, price, stock, images FROM products WHERE id = ? AND is_active = 1").get(item.id) as any;
        if (!prod) {
          return jsonResponse({ success: false, message: `Ürün bulunamadı: ID ${item.id}` }, 400);
        }

        const qty = Math.max(1, Number(item.quantity) || 1);
        if (prod.stock < qty) {
          return jsonResponse({ success: false, message: `"${prod.name}" için yeterli stok bulunmuyor (Mevcut: ${prod.stock})` }, 400);
        }

        const lineTotal = prod.price * qty;
        subtotal += lineTotal;

        let imgUrl = "";
        try {
          const imgs = JSON.parse(prod.images || "[]");
          if (imgs.length) imgUrl = imgs[0];
        } catch {}

        validatedItems.push({
          product_id: prod.id,
          product_name: prod.name,
          price: prod.price,
          quantity: qty,
          total: lineTotal,
          image: imgUrl,
          variant_info: item.variant || ""
        });
      }

      // Free shipping threshold check
      const freeShipThreshold = Number((db.query("SELECT value FROM settings WHERE key='free_shipping_threshold'").get() as any)?.value || 750);
      const baseShippingFee = Number((db.query("SELECT value FROM settings WHERE key='shipping_fee'").get() as any)?.value || 59.90);
      const shippingCost = subtotal >= freeShipThreshold ? 0 : baseShippingFee;

      // Discount calculation
      let discountAmount = 0;
      if (coupon_code) {
        const coupon = db.prepare("SELECT * FROM coupons WHERE UPPER(code) = ? AND is_active = 1").get(coupon_code.toUpperCase().trim()) as any;
        if (coupon && (!coupon.min_spend || subtotal >= coupon.min_spend)) {
          if (coupon.discount_type === "percent") {
            discountAmount = (subtotal * coupon.discount_value) / 100;
            if (coupon.max_discount && discountAmount > coupon.max_discount) {
              discountAmount = coupon.max_discount;
            }
          } else {
            discountAmount = coupon.discount_value;
          }
          discountAmount = Math.min(discountAmount, subtotal);
          db.prepare("UPDATE coupons SET usage_count = usage_count + 1 WHERE id = ?").run(coupon.id);
        }
      }

      const total = Math.max(0, subtotal + shippingCost - discountAmount);

      // Generate unique order number
      const orderNumber = "PZR-" + Math.floor(100000 + Math.random() * 900000);
      const trackingNumber = "YK" + Math.floor(100000000 + Math.random() * 900000000);

      const currentUser = getAuthenticatedUser(req);
      let userId = currentUser ? currentUser.userId : (Number(body.user_id) || null);
      if (!userId && customer?.email) {
        const u = db.prepare("SELECT id FROM users WHERE LOWER(email) = LOWER(?)").get(customer.email.trim()) as any;
        if (u) userId = u.id;
      }

      const orderResult = db.prepare(`
        INSERT INTO orders (
          order_number, user_id, customer_name, customer_email, customer_phone,
          shipping_address, city, district, postal_code, shipping_company,
          payment_method, payment_status, order_status, subtotal, shipping_cost,
          discount_amount, total, coupon_code, tracking_number, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'processing', ?, ?, ?, ?, ?, ?, ?)
      `).run(
        orderNumber,
        userId,
        customer.name,
        customer.email,
        customer.phone,
        shipping.address,
        shipping.city,
        shipping.district || "",
        shipping.postalCode || "",
        shipping.cargoCompany || "Yurtiçi Kargo",
        payment?.method || "credit_card",
        "paid",
        subtotal,
        shippingCost,
        discountAmount,
        total,
        coupon_code || "",
        trackingNumber,
        customer.notes || ""
      );

      const orderId = orderResult.lastInsertRowid;

      // Insert order items and decrease product stock
      const insertItem = db.prepare(`
        INSERT INTO order_items (order_id, product_id, product_name, price, quantity, total, image, variant_info)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const decreaseStock = db.prepare(`
        UPDATE products SET stock = stock - ? WHERE id = ?
      `);

      for (const item of validatedItems) {
        insertItem.run(
          orderId,
          item.product_id,
          item.product_name,
          item.price,
          item.quantity,
          item.total,
          item.image,
          item.variant_info
        );
        decreaseStock.run(item.quantity, item.product_id);
      }

      return jsonResponse({
        success: true,
        order: {
          id: orderId,
          order_number: orderNumber,
          tracking_number: trackingNumber,
          customer_name: customer.name,
          customer_email: customer.email,
          total,
          subtotal,
          shipping_cost: shippingCost,
          discount_amount: discountAmount,
          created_at: new Date().toISOString()
        },
        message: "Siparişiniz başarıyla alındı!"
      });
    }

    // ----------------------------------------------------
    // 7. ORDER TRACKING (PUBLIC)
    // ----------------------------------------------------
    if (pathname === "/api/orders/track" && method === "GET") {
      const orderNumber = url.searchParams.get("order_number")?.trim().toUpperCase();
      const identifier = url.searchParams.get("identifier")?.trim(); // email or phone

      if (!orderNumber) {
        return jsonResponse({ success: false, message: "Lütfen sipariş numaranızı giriniz." }, 400);
      }

      let order: any = null;
      if (identifier) {
        order = db.prepare(`
          SELECT * FROM orders
          WHERE UPPER(order_number) = ? AND (customer_email = ? OR customer_phone = ?)
        `).get(orderNumber, identifier, identifier);
      } else {
        order = db.prepare(`
          SELECT * FROM orders WHERE UPPER(order_number) = ?
        `).get(orderNumber);
      }

      if (!order) {
        return jsonResponse({ success: false, message: "Belirtilen bilgilere ait sipariş bulunamadı." }, 404);
      }

      const items = db.prepare("SELECT * FROM order_items WHERE order_id = ?").all(order.id);

      return jsonResponse({
        success: true,
        order: {
          ...order,
          items
        }
      });
    }

    // ----------------------------------------------------
    // 8. CUSTOMER REVIEWS
    // ----------------------------------------------------
    if (pathname === "/api/reviews" && method === "POST") {
      const body = await req.json().catch(() => ({}));
      const { product_id, user_name, rating, comment } = body;

      if (!product_id || !user_name || !rating || !comment) {
        return jsonResponse({ success: false, message: "Lütfen tüm yorum alanlarını doldurunuz." }, 400);
      }

      const numRating = Math.max(1, Math.min(5, Number(rating) || 5));

      db.prepare(`
        INSERT INTO reviews (product_id, user_name, rating, comment, is_verified, is_approved)
        VALUES (?, ?, ?, ?, 1, 1)
      `).run(product_id, user_name, numRating, comment);

      // Update product average rating & review count
      const avgRes = db.prepare(`
        SELECT AVG(rating) as avg_rating, COUNT(id) as count
        FROM reviews
        WHERE product_id = ? AND is_approved = 1
      `).get(product_id) as any;

      if (avgRes) {
        db.prepare(`
          UPDATE products
          SET rating = ?, review_count = ?
          WHERE id = ?
        `).run(Math.round(avgRes.avg_rating * 10) / 10, avgRes.count, product_id);
      }

      return jsonResponse({ success: true, message: "Yorumunuz için teşekkür ederiz!" });
    }

    // ----------------------------------------------------
    // 9. AUTH: LOGIN & REGISTER
    // ----------------------------------------------------
    if (pathname === "/api/auth/register" && method === "POST") {
      const body = await req.json().catch(() => ({}));
      const { email, password, full_name, phone } = body;

      if (!email || !password || !full_name) {
        return jsonResponse({ success: false, message: "Lütfen zorunlu alanları doldurunuz." }, 400);
      }

      const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
      if (existing) {
        return jsonResponse({ success: false, message: "Bu e-posta adresi ile zaten bir hesap mevcut." }, 400);
      }

      const hasher = new Bun.CryptoHasher("sha256");
      hasher.update(password);
      const hash = hasher.digest("hex");

      const res = db.prepare(`
        INSERT INTO users (email, password_hash, full_name, phone, role)
        VALUES (?, ?, ?, ?, 'customer')
      `).run(email, hash, full_name, phone || "");

      const userId = Number(res.lastInsertRowid);
      const token = generateToken();
      sessions.set(token, { userId, role: "customer", email, name: full_name });

      return jsonResponse(
        {
          success: true,
          user: { id: userId, email, full_name, role: "customer" },
          token,
          message: "Kayıt başarılı! Hoş geldiniz."
        },
        201,
        { "Set-Cookie": `pzr_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000` }
      );
    }

    if (pathname === "/api/auth/login" && method === "POST") {
      const body = await req.json().catch(() => ({}));
      const { email, password } = body;

      if (!email || !password) {
        return jsonResponse({ success: false, message: "E-posta ve şifre gereklidir." }, 400);
      }

      const hasher = new Bun.CryptoHasher("sha256");
      hasher.update(password);
      const hash = hasher.digest("hex");

      const user = db.prepare(`
        SELECT id, email, full_name, phone, address, city, district, role
        FROM users
        WHERE email = ? AND password_hash = ?
      `).get(email, hash) as any;

      if (!user) {
        return jsonResponse({ success: false, message: "Geçersiz e-posta veya şifre." }, 401);
      }

      const token = generateToken();
      sessions.set(token, {
        userId: user.id,
        role: user.role,
        email: user.email,
        name: user.full_name
      });

      return jsonResponse(
        {
          success: true,
          user,
          token,
          message: `Giriş başarılı! Hoş geldin ${user.full_name}`
        },
        200,
        { "Set-Cookie": `pzr_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000` }
      );
    }

    if (pathname === "/api/auth/me" && method === "GET") {
      let sessionUser = getAuthenticatedUser(req);
      let userId = sessionUser ? sessionUser.userId : null;
      let userEmail = "";

      if (!userId) {
        const queryEmail = url.searchParams.get("email")?.toLowerCase().trim();
        const queryId = Number(url.searchParams.get("user_id"));
        if (queryEmail) {
          const u = db.prepare("SELECT id, email FROM users WHERE LOWER(email) = ?").get(queryEmail) as any;
          if (u) {
            userId = u.id;
            userEmail = u.email;
          }
        } else if (queryId) {
          userId = queryId;
        }
      }

      if (!userId) {
        return jsonResponse({ success: false, message: "Oturum bulunamadı." }, 401);
      }

      const user = db.prepare(`
        SELECT id, email, full_name, phone, address, city, district, role, created_at
        FROM users WHERE id = ?
      `).get(userId) as any;

      if (user && !userEmail) userEmail = user.email;

      const orders = db.prepare(`
        SELECT * FROM orders 
        WHERE (user_id IS NOT NULL AND user_id = ?) OR (customer_email IS NOT NULL AND customer_email != '' AND LOWER(customer_email) = LOWER(?))
        ORDER BY id DESC LIMIT 50
      `).all(userId, userEmail) as any[];

      for (const ord of orders) {
        ord.items = db.prepare(`
          SELECT * FROM order_items WHERE order_id = ?
        `).all(ord.id);
      }

      return jsonResponse({ success: true, user, orders });
    }

    if (pathname === "/api/user/orders" && method === "GET") {
      const sessionUser = getAuthenticatedUser(req);
      const queryEmail = url.searchParams.get("email")?.toLowerCase().trim();
      const queryUserId = Number(url.searchParams.get("user_id"));

      let userId = sessionUser ? sessionUser.userId : (queryUserId || null);
      let email = queryEmail || "";

      if (!userId && email) {
        const u = db.prepare("SELECT id, email FROM users WHERE LOWER(email) = ?").get(email) as any;
        if (u) {
          userId = u.id;
          email = u.email;
        }
      } else if (userId && !email) {
        const u = db.prepare("SELECT email FROM users WHERE id = ?").get(userId) as any;
        if (u?.email) email = u.email;
      }

      let orders: any[] = [];
      if (userId || email) {
        orders = db.prepare(`
          SELECT * FROM orders 
          WHERE (user_id IS NOT NULL AND user_id = ?) OR (customer_email IS NOT NULL AND customer_email != '' AND LOWER(customer_email) = LOWER(?))
          ORDER BY id DESC LIMIT 50
        `).all(userId || -1, email || "") as any[];

        for (const ord of orders) {
          ord.items = db.prepare(`
            SELECT * FROM order_items WHERE order_id = ?
          `).all(ord.id);
        }
      }

      return jsonResponse({ success: true, orders });
    }

    if (pathname === "/api/auth/logout" && method === "POST") {
      const authHeader = req.headers.get("Authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        sessions.delete(authHeader.substring(7));
      }
      return jsonResponse(
        { success: true, message: "Çıkış yapıldı." },
        200,
        { "Set-Cookie": "pzr_session=; Path=/; HttpOnly; Max-Age=0" }
      );
    }

    // ----------------------------------------------------
    // 9.1 USER PROFILE & ADDRESS MANAGEMENT
    // ----------------------------------------------------
    if (pathname === "/api/user/profile" && method === "PUT") {
      const sessionUser = getAuthenticatedUser(req);
      const body = await req.json().catch(() => ({}));
      const userId = sessionUser ? sessionUser.userId : (Number(body.user_id) || 2);

      const { full_name, phone, address, city, district } = body;

      db.prepare(`
        UPDATE users
        SET full_name = COALESCE(?, full_name),
            phone = COALESCE(?, phone),
            address = COALESCE(?, address),
            city = COALESCE(?, city),
            district = COALESCE(?, district)
        WHERE id = ?
      `).run(full_name || null, phone || null, address || null, city || null, district || null, userId);

      const updated = db.prepare(`
        SELECT id, email, full_name, phone, address, city, district, role
        FROM users WHERE id = ?
      `).get(userId) as any;

      return jsonResponse({
        success: true,
        user: updated,
        message: "Profil bilgileriniz başarıyla güncellendi."
      });
    }

    if (pathname === "/api/user/addresses" && method === "GET") {
      const sessionUser = getAuthenticatedUser(req);
      const queryUserId = Number(url.searchParams.get("user_id"));
      const userId = sessionUser ? sessionUser.userId : (queryUserId || 2);

      const addresses = db.prepare(`
        SELECT * FROM user_addresses
        WHERE user_id = ?
        ORDER BY is_default DESC, id DESC
      `).all(userId);

      return jsonResponse({ success: true, addresses });
    }

    if (pathname === "/api/user/addresses" && method === "POST") {
      const sessionUser = getAuthenticatedUser(req);
      const body = await req.json().catch(() => ({}));
      const userId = sessionUser ? sessionUser.userId : (Number(body.user_id) || 2);

      const {
        title,
        recipient_name,
        phone,
        city,
        district,
        address_line,
        zip_code,
        is_default
      } = body;

      if (!title || !recipient_name || !phone || !city || !district || !address_line) {
        return jsonResponse({ success: false, message: "Lütfen zorunlu alanları doldurunuz." }, 400);
      }

      if (is_default) {
        db.prepare("UPDATE user_addresses SET is_default = 0 WHERE user_id = ?").run(userId);
      }

      const res = db.prepare(`
        INSERT INTO user_addresses (
          user_id, title, recipient_name, phone, city, district, address_line, zip_code, is_default
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        userId,
        title,
        recipient_name,
        phone,
        city,
        district,
        address_line,
        zip_code || "",
        is_default ? 1 : 0
      );

      // If user has no primary address on user table, update it
      db.prepare(`
        UPDATE users
        SET address = COALESCE(address, ?),
            city = COALESCE(city, ?),
            district = COALESCE(district, ?),
            phone = COALESCE(phone, ?)
        WHERE id = ?
      `).run(address_line, city, district, phone, userId);

      const newAddress = db.prepare("SELECT * FROM user_addresses WHERE id = ?").get(res.lastInsertRowid);

      return jsonResponse({
        success: true,
        address: newAddress,
        message: "Yeni adresiniz başarıyla kaydedildi."
      }, 201);
    }

    if (pathname.startsWith("/api/user/addresses/") && method === "PUT") {
      const id = Number(pathname.split("/").pop());
      const sessionUser = getAuthenticatedUser(req);
      const body = await req.json().catch(() => ({}));
      const userId = sessionUser ? sessionUser.userId : (Number(body.user_id) || 2);

      const {
        title,
        recipient_name,
        phone,
        city,
        district,
        address_line,
        zip_code,
        is_default
      } = body;

      if (is_default) {
        db.prepare("UPDATE user_addresses SET is_default = 0 WHERE user_id = ?").run(userId);
      }

      db.prepare(`
        UPDATE user_addresses
        SET title = COALESCE(?, title),
            recipient_name = COALESCE(?, recipient_name),
            phone = COALESCE(?, phone),
            city = COALESCE(?, city),
            district = COALESCE(?, district),
            address_line = COALESCE(?, address_line),
            zip_code = COALESCE(?, zip_code),
            is_default = COALESCE(?, is_default)
        WHERE id = ? AND user_id = ?
      `).run(
        title || null,
        recipient_name || null,
        phone || null,
        city || null,
        district || null,
        address_line || null,
        zip_code || null,
        is_default !== undefined ? (is_default ? 1 : 0) : null,
        id,
        userId
      );

      const updated = db.prepare("SELECT * FROM user_addresses WHERE id = ?").get(id);

      return jsonResponse({
        success: true,
        address: updated,
        message: "Adres başarıyla güncellendi."
      });
    }

    if (pathname.startsWith("/api/user/addresses/") && method === "DELETE") {
      const id = Number(pathname.split("/").pop());
      const sessionUser = getAuthenticatedUser(req);
      const userId = sessionUser ? sessionUser.userId : (Number(url.searchParams.get("user_id")) || 2);

      db.prepare("DELETE FROM user_addresses WHERE id = ? AND user_id = ?").run(id, userId);

      return jsonResponse({
        success: true,
        message: "Adres başarıyla silindi."
      });
    }

    // ----------------------------------------------------
    // 10. ADMIN DASHBOARD & MANAGEMENT ENDPOINTS
    // ----------------------------------------------------
    if (pathname.startsWith("/api/admin/")) {
      const currentUser = getAuthenticatedUser(req);
      // For ease of development, allow if admin session or query secret ?admin=1
      const devAdmin = url.searchParams.get("admin") === "1" || (currentUser && currentUser.role === "admin");

      // Admin Image / Media Upload
      if (pathname === "/api/admin/upload" && method === "POST") {
        try {
          const formData = await req.formData();
          const file = formData.get("file") as File;
          if (!file || typeof file === "string") {
            return jsonResponse({ success: false, message: "Yüklenecek dosya seçilmedi." }, 400);
          }

          const origName = file.name || "image.jpg";
          const ext = extname(origName).toLowerCase() || ".jpg";
          const allowedExts = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"];
          if (!allowedExts.includes(ext)) {
            return jsonResponse({ success: false, message: "Desteklenmeyen dosya formatı. (PNG, JPG, JPEG, WEBP, SVG kabul edilir)" }, 400);
          }

          const uploadsDir = join(process.cwd(), "public", "uploads");
          if (!existsSync(uploadsDir)) {
            mkdirSync(uploadsDir, { recursive: true });
          }

          const baseClean = origName.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_").toLowerCase();
          const uniqueName = `${baseClean}-${Date.now()}${ext}`;
          const filePath = join(uploadsDir, uniqueName);

          const arrayBuffer = await file.arrayBuffer();
          await Bun.write(filePath, arrayBuffer);

          return jsonResponse({
            success: true,
            url: `uploads/${uniqueName}`,
            fullUrl: `/uploads/${uniqueName}`,
            filename: uniqueName,
            message: "Görsel başarıyla yüklendi!"
          });
        } catch (err: any) {
          return jsonResponse({ success: false, message: "Görsel yüklenirken hata oluştu: " + err.message }, 500);
        }
      }

      if (pathname === "/api/admin/overview" && method === "GET") {
        const totalSales = (db.query("SELECT SUM(total) as val FROM orders WHERE payment_status = 'paid'").get() as any)?.val || 0;
        const totalOrders = (db.query("SELECT COUNT(id) as val FROM orders").get() as any)?.val || 0;
        const totalProducts = (db.query("SELECT COUNT(id) as val FROM products WHERE is_active = 1").get() as any)?.val || 0;
        const totalCustomers = (db.query("SELECT COUNT(id) as val FROM users WHERE role = 'customer'").get() as any)?.val || 0;
        const lowStockCount = (db.query("SELECT COUNT(id) as val FROM products WHERE stock <= 5 AND is_active = 1").get() as any)?.val || 0;

        const recentOrders = db.query(`
          SELECT id, order_number, customer_name, customer_email, total, order_status, created_at
          FROM orders
          ORDER BY id DESC
          LIMIT 8
        `).all();

        const topProducts = db.query(`
          SELECT id, name, price, stock, review_count, rating, images
          FROM products
          ORDER BY review_count DESC, id DESC
          LIMIT 5
        `).all() as any[];

        for (const p of topProducts) {
          try { p.images = JSON.parse(p.images || "[]"); } catch { p.images = []; }
        }

        return jsonResponse({
          success: true,
          metrics: {
            totalSales,
            totalOrders,
            totalProducts,
            totalCustomers,
            lowStockCount
          },
          recentOrders,
          topProducts
        });
      }

      // Admin Products CRUD
      if (pathname === "/api/admin/products" && method === "GET") {
        const products = db.query(`
          SELECT p.*, c.name as category_name
          FROM products p
          LEFT JOIN categories c ON c.id = p.category_id
          ORDER BY p.id DESC
        `).all() as any[];

        for (const p of products) {
          try { p.images = JSON.parse(p.images || "[]"); } catch { p.images = []; }
          try { p.specs = JSON.parse(p.specs || "{}"); } catch { p.specs = {}; }
        }

        return jsonResponse({ success: true, products });
      }

      if (pathname === "/api/admin/products" && method === "POST") {
        const body = await req.json().catch(() => ({}));
        const {
          category_id, name, short_desc, description, price, compare_at_price,
          sku, stock, badge, is_featured, is_bestseller, images, specs
        } = body;

        if (!name || !price) {
          return jsonResponse({ success: false, message: "Ürün adı ve fiyatı zorunludur." }, 400);
        }

        const slug = name
          .toLowerCase()
          .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
          .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "") + "-" + Math.floor(100 + Math.random() * 900);

        const res = db.prepare(`
          INSERT INTO products (
            category_id, name, slug, short_desc, description, price, compare_at_price,
            sku, stock, badge, is_featured, is_bestseller, images, specs
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          category_id || 1,
          name,
          slug,
          short_desc || "",
          description || "",
          Number(price),
          compare_at_price ? Number(compare_at_price) : null,
          sku || "PZR-" + Math.floor(1000 + Math.random() * 9000),
          Number(stock) || 10,
          badge || "",
          is_featured ? 1 : 0,
          is_bestseller ? 1 : 0,
          JSON.stringify(images || []),
          JSON.stringify(specs || {})
        );

        return jsonResponse({ success: true, id: res.lastInsertRowid, message: "Ürün başarıyla eklendi!" }, 201);
      }

      if (pathname.startsWith("/api/admin/products/") && method === "PUT") {
        const id = Number(pathname.replace("/api/admin/products/", ""));
        const body = await req.json().catch(() => ({}));

        db.prepare(`
          UPDATE products SET
            name = COALESCE(?, name),
            price = COALESCE(?, price),
            compare_at_price = ?,
            stock = COALESCE(?, stock),
            badge = COALESCE(?, badge),
            is_featured = COALESCE(?, is_featured),
            is_bestseller = COALESCE(?, is_bestseller),
            is_active = COALESCE(?, is_active),
            short_desc = COALESCE(?, short_desc),
            description = COALESCE(?, description)
          WHERE id = ?
        `).run(
          body.name,
          body.price ? Number(body.price) : null,
          body.compare_at_price ? Number(body.compare_at_price) : null,
          body.stock !== undefined ? Number(body.stock) : null,
          body.badge,
          body.is_featured !== undefined ? (body.is_featured ? 1 : 0) : null,
          body.is_bestseller !== undefined ? (body.is_bestseller ? 1 : 0) : null,
          body.is_active !== undefined ? (body.is_active ? 1 : 0) : null,
          body.short_desc,
          body.description,
          id
        );

        return jsonResponse({ success: true, message: "Ürün güncellendi!" });
      }

      if (pathname.startsWith("/api/admin/products/") && method === "DELETE") {
        const id = Number(pathname.replace("/api/admin/products/", ""));
        db.prepare("DELETE FROM products WHERE id = ?").run(id);
        return jsonResponse({ success: true, message: "Ürün silindi." });
      }

      // Admin Orders
      if (pathname === "/api/admin/orders" && method === "GET") {
        const orders = db.query(`
          SELECT * FROM orders ORDER BY id DESC LIMIT 50
        `).all();
        return jsonResponse({ success: true, orders });
      }

      if (pathname.startsWith("/api/admin/orders/") && method === "PUT") {
        const id = Number(pathname.replace("/api/admin/orders/", ""));
        const body = await req.json().catch(() => ({}));

        db.prepare(`
          UPDATE orders SET
            order_status = COALESCE(?, order_status),
            tracking_number = COALESCE(?, tracking_number),
            shipping_company = COALESCE(?, shipping_company)
          WHERE id = ?
        `).run(body.order_status, body.tracking_number, body.shipping_company, id);

        return jsonResponse({ success: true, message: "Sipariş güncellendi!" });
      }

      // Admin Coupons
      if (pathname === "/api/admin/coupons" && method === "GET") {
        const coupons = db.query("SELECT * FROM coupons ORDER BY id DESC").all();
        return jsonResponse({ success: true, coupons });
      }

      if (pathname === "/api/admin/coupons" && method === "POST") {
        const body = await req.json().catch(() => ({}));
        db.prepare(`
          INSERT INTO coupons (code, discount_type, discount_value, min_spend, max_discount, usage_limit, is_active)
          VALUES (?, ?, ?, ?, ?, ?, 1)
        `).run(
          body.code?.toUpperCase().trim(),
          body.discount_type || "percent",
          Number(body.discount_value) || 10,
          Number(body.min_spend) || 0,
          body.max_discount ? Number(body.max_discount) : null,
          Number(body.usage_limit) || 500
        );
        return jsonResponse({ success: true, message: "Kupon başarıyla oluşturuldu!" });
      }
    }

    // ----------------------------------------------------
    // 11. FILE UPLOAD ENDPOINT
    // ----------------------------------------------------
    if (pathname === "/api/upload" && method === "POST") {
      const formData = await req.formData().catch(() => null);
      if (!formData) {
        return jsonResponse({ success: false, message: "Dosya yüklenemedi." }, 400);
      }

      const file = formData.get("file") as File;
      if (!file) {
        return jsonResponse({ success: false, message: "Dosya bulunamadı." }, 400);
      }

      const uploadDir = join(process.cwd(), "public", "uploads");
      if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir, { recursive: true });
      }

      const ext = file.name.split(".").pop() || "jpg";
      const fileName = `upload_${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;
      const filePath = join(uploadDir, fileName);

      const arrayBuffer = await file.arrayBuffer();
      writeFileSync(filePath, Buffer.from(arrayBuffer));

      return jsonResponse({
        success: true,
        url: `/uploads/${fileName}`,
        message: "Dosya başarıyla yüklendi."
      });
    }

    return jsonResponse({ success: false, message: "API rotası bulunamadı." }, 404);

  } catch (error: any) {
    console.error("API Hatası:", error);
    return jsonResponse({ success: false, message: error.message || "Sunucu hatası" }, 500);
  }
}

