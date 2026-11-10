import { db, initDatabase } from "./db";

export function seedData() {
  initDatabase();

  // Check if categories already exist
  const catCount = (db.query("SELECT COUNT(*) as c FROM categories").get() as any)?.c || 0;
  if (catCount > 0) {
    // Check if user addresses need seeding
    const addrCount = (db.query("SELECT COUNT(*) as c FROM user_addresses").get() as any)?.c || 0;
    if (addrCount === 0) {
      db.prepare(`
        INSERT INTO user_addresses (user_id, title, recipient_name, phone, city, district, address_line, zip_code, is_default)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(2, "Ev Adresim", "Ahmet Yılmaz", "0532 100 20 30", "Ankara", "Çankaya", "Atatürk Bulvarı No:15 Daire:4, Kızılay", "06420", 1);
      db.prepare(`
        INSERT INTO user_addresses (user_id, title, recipient_name, phone, city, district, address_line, zip_code, is_default)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(2, "İş / Ofis Adresim", "Ahmet Yılmaz", "0532 100 20 30", "İstanbul", "Şişli", "Büyükdere Cad. No:192 Kule Plaza Kat:14", "34394", 0);
      console.log(" Örnek kullanıcı adresleri eklendi.");
    }
    console.log(" Veritabanında mevcut veri bulundu, seed atlanıyor.");
    return;
  }

  console.log(" Pazarvadi veritabanı örnek verilerle dolduruluyor...");

  // Default Admin User
  // Note: For simplicity and portability without external bcrypt, we store sha256
  const hasher = new Bun.CryptoHasher("sha256");
  hasher.update("admin123");
  const adminPassHash = hasher.digest("hex");

  const custHasher = new Bun.CryptoHasher("sha256");
  custHasher.update("pazarvadi123");
  const custPassHash = custHasher.digest("hex");

  db.prepare(`
    INSERT INTO users (email, password_hash, full_name, phone, address, city, district, role)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "admin@pazarvadi.com",
    adminPassHash,
    "Pazarvadi Yönetici",
    "0850 555 00 00",
    "Merkez Mah. Teknoloji Cad. No:42",
    "İstanbul",
    "Kadıköy",
    "admin"
  );

  db.prepare(`
    INSERT INTO users (email, password_hash, full_name, phone, address, city, district, role)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "demo@pazarvadi.com",
    custPassHash,
    "Ahmet Yılmaz",
    "0532 100 20 30",
    "Atatürk Bulvarı No:15 Daire:4",
    "Ankara",
    "Çankaya",
    "customer"
  );

  // User Addresses Seed
  db.prepare(`
    INSERT INTO user_addresses (user_id, title, recipient_name, phone, city, district, address_line, zip_code, is_default)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    2,
    "Ev Adresim",
    "Ahmet Yılmaz",
    "0532 100 20 30",
    "Ankara",
    "Çankaya",
    "Atatürk Bulvarı No:15 Daire:4, Kızılay",
    "06420",
    1
  );

  db.prepare(`
    INSERT INTO user_addresses (user_id, title, recipient_name, phone, city, district, address_line, zip_code, is_default)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    2,
    "İş / Ofis Adresim",
    "Ahmet Yılmaz",
    "0532 100 20 30",
    "İstanbul",
    "Şişli",
    "Büyükdere Cad. No:192 Kule Plaza Kat:14",
    "34394",
    0
  );

  // Settings
  const settings = [
    ["site_title", "Pazarvadi - Yeni Nesil E-Ticaret Deneyimi"],
    ["site_slogan", "Kaliteli Ürünler, Hızlı Teslimat, Güvenli Alışveriş"],
    ["support_phone", "0850 555 72 98"],
    ["support_email", "destek@pazarvadi.com"],
    ["free_shipping_threshold", "750"],
    ["shipping_fee", "59.90"],
    ["tax_rate", "20"],
    ["currency", "TL"],
    ["instagram", "pazurkaofficial"],
    ["whatsapp", "908505557298"]
  ];

  for (const [key, value] of settings) {
    db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)").run(key, value);
  }

  // Categories
  const categories = [
    {
      name: "Elektronik & Teknoloji",
      slug: "elektronik-teknoloji",
      description: "Akıllı telefonlar, kulaklıklar, akıllı saatler ve teknolojik aksesuarlar",
      icon: "laptop",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
      display_order: 1
    },
    {
      name: "Moda & Aksesuar",
      slug: "moda-aksesuar",
      description: "Son moda giyim, lüks deri çantalar, saatler ve takılar",
      icon: "shirt",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80",
      display_order: 2
    },
    {
      name: "Ev, Yaşam & Mutfak",
      slug: "ev-yasam-mutfak",
      description: "Robot süpürgeler, espresso makineleri ve modern ev dekorasyonu",
      icon: "home",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80",
      display_order: 3
    },
    {
      name: "Spor & Outdoor",
      slug: "spor-outdoor",
      description: "Antrenman ekipmanları, outdoor giyim, mataralar ve spor saatleri",
      icon: "activity",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80",
      display_order: 4
    },
    {
      name: "Kozmetik & Bakım",
      slug: "kozmetik-bakim",
      description: "Organik cilt bakım ürünleri, niş parfümler ve kişisel bakım cihazları",
      icon: "sparkles",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80",
      display_order: 5
    }
  ];

  const insertCat = db.prepare(`
    INSERT INTO categories (name, slug, description, icon, image, display_order)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  for (const cat of categories) {
    insertCat.run(cat.name, cat.slug, cat.description, cat.icon, cat.image, cat.display_order);
  }

  // Products
  const products = [
    // Elektronik
    {
      category_id: 1,
      name: "Pazarvadi Pro ANC Kablosuz Kulak Üstü Kulaklık",
      slug: "pazurka-pro-anc-kablosuz-kulaklik",
      short_desc: "Aktif Gürültü Engelleme (ANC), 45 Saat Pil Ömrü, Hi-Res Audio ve Şeffaf Mod",
      description: "Pazarvadi Pro ANC, müziği tüm ayrıntılarıyla hissetmeniz için tasarlandı. 40mm dinamik sürücüler, çift mikrofonlu hibrit gürültü engelleme sistemi ve ultra yumuşak protein deri kulak yastıkları ile gün boyu kesintisiz stüdyo kalitesinde konfor sunar.",
      price: 3499.00,
      compare_at_price: 4299.00,
      sku: "PZR-TECH-001",
      barcode: "868000100201",
      stock: 45,
      rating: 4.9,
      review_count: 128,
      badge: "Fırsat",
      is_featured: 1,
      is_bestseller: 1,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80"
      ]),
      specs: JSON.stringify({
        "Bağlantı": "Bluetooth 5.3 + 3.5mm Aux",
        "Pil Ömrü": "45 Saat (ANC Açıkken 35 Saat)",
        "Şarj Süresi": "10 dk şarjla 4 saat kullanım",
        "Sürücü Çapı": "40mm Biyoselüloz Titanyum",
        "Ağırlık": "245 gram",
        "Garanti": "2 Yıl Pazarvadi Türkiye Garantili"
      })
    },
    {
      category_id: 1,
      name: "Pazarvadi Chrono Ultra Akıllı Titanyum Saat",
      slug: "pazurka-chrono-ultra-akilli-saat",
      short_desc: "1.43 inç AMOLED Ekran, Safir Cam, EKG + Kandaki Oksijen Sensörü, Titanyum Kasa",
      description: "Hem toplantı odasında hem doğa maceralarında yanınızda. Safir cam ve havacılık sınıfı titanyum kasa ile darbelere karşı dayanıklı. 100+ spor modu, Bluetooth üzerinden telefon görüşmesi ve 14 güne varan pil ömrü.",
      price: 5890.00,
      compare_at_price: 6990.00,
      sku: "PZR-TECH-002",
      barcode: "868000100202",
      stock: 28,
      rating: 4.8,
      review_count: 84,
      badge: "Çok Satan",
      is_featured: 1,
      is_bestseller: 1,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80"
      ]),
      specs: JSON.stringify({
        "Ekran": "1.43\" AMOLED 466x466 px (1000 nit)",
        "Gövde": "Havacılık Sınıfı Titanyum + Seramik Arka Kapak",
        "Suya Dayanıklılık": "5 ATM (50 Metreye Kadar)",
        "Pil Ömrü": "14 Gün Standart Kullanım",
        "Sensörler": "Kalp Atış Hızı, SpO2, EKG, Uyku Takibi, İvmeölçer"
      })
    },
    {
      category_id: 1,
      name: "Pazarvadi Pods Pro True Wireless Kulaklık",
      slug: "pazurka-pods-pro-kablosuz-kulaklik",
      short_desc: "Uzamsal Ses, Kablosuz Şarj Kutusu, Kristal Netliğinde Mikrofon",
      description: "Cebinizdeki dev ses performansı. Ergonomik tasarımı kulağınıza tam oturur, IPX5 ter ve su sıçramalarına dayanıklıdır. Çift mikrofonlu ENC teknolojisi rüzgarlı havalarda bile sesinizi pürüzsüz iletir.",
      price: 1899.00,
      compare_at_price: 2450.00,
      sku: "PZR-TECH-003",
      barcode: "868000100203",
      stock: 60,
      rating: 4.7,
      review_count: 96,
      badge: "Yeni",
      is_featured: 0,
      is_bestseller: 1,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=80"
      ]),
      specs: JSON.stringify({
        "Bluetooth": "5.4 Düşük Gecikme",
        "Toplam Çalma": "32 Saat (Kutu Dahil)",
        "Kablosuz Şarj": "Qi Uyumlu",
        "Gecikme Süresi": "Oyun Modunda 40ms"
      })
    },

    // Moda & Aksesuar
    {
      category_id: 2,
      name: "Pazarvadi Heritage El Yapımı Hakiki Deri Sırt Çantası",
      slug: "pazurka-heritage-hakiki-deri-sirt-cantasi",
      short_desc: "16\" Laptop Bölmeli, Vintage Tabaklanmış Dana Derisi, Su İtici Astar",
      description: "Zamanla güzelleşen, nesilden nesile aktarılacak bir zanaat harikası. %100 birinci sınıf vejetal tabaklanmış hakiki dana derisinden el işçiliğiyle üretilmiştir. Darbe emici süngerli 16 inç MacBook / laptop yuvası.",
      price: 4750.00,
      compare_at_price: 5900.00,
      sku: "PZR-MODA-001",
      barcode: "868000100301",
      stock: 15,
      rating: 5.0,
      review_count: 42,
      badge: "Özel Tasarım",
      is_featured: 1,
      is_bestseller: 0,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80"
      ]),
      specs: JSON.stringify({
        "Malzeme": "%100 Vejetal Hakiki Deri",
        "Kapasite": "22 Litre",
        "Laptop Boyutu": "16 inçe kadar uyumlu",
        "Fermuarlar": "YKK Antik Pirinç"
      })
    },
    {
      category_id: 2,
      name: "Pazarvadi Minimalist Polarize Güneş Gözlüğü (Mat Siyah)",
      slug: "pazurka-minimalist-polarize-gunes-gozlugu",
      short_desc: "UV400 Koruma, Japon Titanyum Çerçeve, Çizilmeye Dayanıklı Polarize Cam",
      description: "Gözlerinizi güneşin zararlı UV ışınlarından korurken şıklığınızdan ödün vermeyin. Ultra hafif titanyum gövdesi burunda ağırlık yapmaz. Deri seyahat kılıfı ve mikrofiber temizleme bezi hediyeli.",
      price: 1599.00,
      compare_at_price: 1999.00,
      sku: "PZR-MODA-002",
      barcode: "868000100302",
      stock: 35,
      rating: 4.8,
      review_count: 53,
      badge: "Trend",
      is_featured: 1,
      is_bestseller: 1,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80"
      ]),
      specs: JSON.stringify({
        "Cam Özelliği": "UV400 Polarize Katmanlı Triasetat",
        "Çerçeve": "Ultra Hafif Titanyum Alaşım",
        "Köprü Ölçüsü": "18 mm",
        "Sap Uzunluğu": "145 mm"
      })
    },

    // Ev & Mutfak
    {
      category_id: 3,
      name: "Pazarvadi Barista Touch Otomatik Espresso & Kahve Makinesi",
      slug: "pazurka-barista-touch-kahve-makinesi",
      short_desc: "19 Bar İtalyan Pompa, Dahili Konik Çelik Değirmen, Profesyonel Süt Köpürtücü",
      description: "Evinizi üçüncü nesil bir kahve dükkanına dönüştürün. Çekirdekten fincana taze öğütüm. Dokunmatik ekranı ile tek tuşla Espresso, Americano, Cappuccino ve Latte hazırlama imkanı.",
      price: 14490.00,
      compare_at_price: 17900.00,
      sku: "PZR-HOME-001",
      barcode: "868000100401",
      stock: 12,
      rating: 4.9,
      review_count: 67,
      badge: "Fırsat",
      is_featured: 1,
      is_bestseller: 1,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80"
      ]),
      specs: JSON.stringify({
        "Basınç Gücü": "19 Bar Ulka İtalyan Pompa",
        "Değirmen": "15 Kademeli Konik Paslanmaz Çelik",
        "Su Haznesi": "2.0 Litre Çıkarılabilir",
        "Güç": "1550 Watt Termoblok Hızlı Isıtma"
      })
    },
    {
      category_id: 3,
      name: "Pazarvadi CleanBot X10 Lidar Lazer Robot Süpürge",
      slug: "pazurka-cleanbot-x10-robot-supurge",
      short_desc: "6000 Pa Emiş Gücü, Sonic Titreşimli Mop, Otomatik Toz Boşaltma İstasyonu",
      description: "Temizliği ona bırakın, zamanınız size kalsın. 3D lazer navigasyon ve yapay zeka engel tanıma ile kablolara ve terliklere takılmaz. Halı tespit edince mopunu 12mm yukarı kaldırır ve emiş gücünü maksimuma çıkarır.",
      price: 18990.00,
      compare_at_price: 22500.00,
      sku: "PZR-HOME-002",
      barcode: "868000100402",
      stock: 18,
      rating: 4.9,
      review_count: 88,
      badge: "Çok Satan",
      is_featured: 1,
      is_bestseller: 1,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80"
      ]),
      specs: JSON.stringify({
        "Emiş Gücü": "6000 Pa",
        "Navigasyon": "LDS Lidar + AI 3D Structured Light",
        "İstasyon": "4 Litre Antibakteriyel Toz Torbası (60 Gün)",
        "Batarya": "5200 mAh (220 m² temizleme alanı)"
      })
    },

    // Spor & Outdoor
    {
      category_id: 4,
      name: "Pazarvadi Aero Vakumlu Çift Katman Çelik Termos (1000 ml)",
      slug: "pazurka-aero-vakumlu-celik-termos-1000ml",
      short_desc: "24 Saat Soğuk, 12 Saat Sıcak Tutar, 18/8 Gıda Sınıfı Çelik, Sızdırmaz Kapak",
      description: "Dağ yürüyüşlerinde, kampta veya spor salonunda suyunuz hep istediğiniz sıcaklıkta. Çift duvarlı vakum yalıtımı ile dış yüzeyi asla terleme yapmaz veya elinizi yakmaz.",
      price: 849.00,
      compare_at_price: 1100.00,
      sku: "PZR-SPOR-001",
      barcode: "868000100501",
      stock: 80,
      rating: 4.9,
      review_count: 145,
      badge: "Fırsat",
      is_featured: 0,
      is_bestseller: 1,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=800&auto=format&fit=crop&q=80"
      ]),
      specs: JSON.stringify({
        "Hacim": "1000 ml / 1 Litre",
        "Yalıtım": "24 Saat Soğuk / 12 Saat Sıcak",
        "Materyal": "18/8 Pro-Grade Paslanmaz Çelik",
        "BPA": "%100 BPA ve Ftalat İçermez"
      })
    },

    // Kozmetik & Bakım
    {
      category_id: 5,
      name: "Pazarvadi Botanicals Yaşlanma Karşıtı C Vitamini Serum Seti",
      slug: "pazurka-botanicals-c-vitamini-serum-seti",
      short_desc: "%15 Saf C Vitamini + Hyaluronik Asit + Ferulik Asit, Aydınlatıcı ve Sıkılaştırıcı",
      description: "Cildinize gençlik ışıltısını geri kazandırın. Dermatolojik olarak test edilmiş, hayvanlar üzerinde test edilmemiş vegan formülü ile koyu leke görünümünü azaltır ve kolajen üretimini destekler.",
      price: 699.00,
      compare_at_price: 950.00,
      sku: "PZR-KOZM-001",
      barcode: "868000100601",
      stock: 50,
      rating: 4.8,
      review_count: 73,
      badge: "Yeni",
      is_featured: 1,
      is_bestseller: 0,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1608248597359-5484501a3556?w=800&auto=format&fit=crop&q=80"
      ]),
      specs: JSON.stringify({
        "İçerik": "%15 L-Askorbik Asit, Hyaluronik Asit, E Vitamini",
        "Hacim": "30 ml Damlalıklı Cam Şişe",
        "Cilt Tipi": "Tüm Cilt Tiplerine Uygun",
        "Sertifika": "Cruelty-Free, Vegan, Paraben İçermez"
      })
    }
  ];

  const insertProd = db.prepare(`
    INSERT INTO products (
      category_id, name, slug, short_desc, description, price, compare_at_price,
      sku, barcode, stock, rating, review_count, badge, is_featured, is_bestseller,
      images, specs
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const p of products) {
    insertProd.run(
      p.category_id, p.name, p.slug, p.short_desc, p.description, p.price, p.compare_at_price,
      p.sku, p.barcode, p.stock, p.rating, p.review_count, p.badge, p.is_featured, p.is_bestseller,
      p.images, p.specs
    );
  }

  // Active Discount Coupons
  const coupons = [
    { code: "PAZARVADI100", discount_type: "fixed", discount_value: 100, min_spend: 1000 },
    { code: "HOSGELDIN20", discount_type: "percent", discount_value: 20, min_spend: 500 },
    { code: "FIRSAT10", discount_type: "percent", discount_value: 10, min_spend: 250 }
  ];

  const insertCoupon = db.prepare(`
    INSERT INTO coupons (code, discount_type, discount_value, min_spend, usage_limit, usage_count, is_active)
    VALUES (?, ?, ?, ?, 1000, 0, 1)
  `);

  for (const c of coupons) {
    insertCoupon.run(c.code, c.discount_type, c.discount_value, c.min_spend);
  }

  // Sample Customer Reviews
  const reviews = [
    { product_id: 1, user_name: "Barış K.", rating: 5, comment: "Ses kalitesi inanılmaz! Gürültü engellemesi uçak ve metroda hayat kurtarıyor. Kesinlikle parasını hak ediyor." },
    { product_id: 1, user_name: "Selin T.", rating: 5, comment: "Pil ömrü bitmek bilmiyor, haftada bir şarj ediyorum. Ergonomisi çok rahat kulağı hiç sıkmıyor." },
    { product_id: 2, user_name: "Murat S.", rating: 5, comment: "Titanyum kasa çok asil duruyor. Ekran parlaklığı güneşte bile harika okunuyor." },
    { product_id: 4, user_name: "Emre D.", rating: 5, comment: "Deri kalitesi kokusundan belli, dikişler ve detaylar çok özenli. İş yerinde herkes sordu." },
    { product_id: 6, user_name: "Canan Y.", rating: 5, comment: "Kahve delisi biri olarak bayıldım. Krema tabakası mükemmel, sabahları vazgeçilmezim oldu." }
  ];

  const insertReview = db.prepare(`
    INSERT INTO reviews (product_id, user_name, rating, comment, is_verified, is_approved)
    VALUES (?, ?, ?, ?, 1, 1)
  `);

  for (const r of reviews) {
    insertReview.run(r.product_id, r.user_name, r.rating, r.comment);
  }

  // Sample Initial Order for admin dashboard demo
  const orderRes = db.prepare(`
    INSERT INTO orders (
      order_number, user_id, customer_name, customer_email, customer_phone,
      shipping_address, city, district, postal_code, shipping_company,
      payment_method, payment_status, order_status, subtotal, shipping_cost,
      discount_amount, total, coupon_code, tracking_number
    ) VALUES (?, 2, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "PZR-" + Math.floor(100000 + Math.random() * 900000),
    "Ahmet Yılmaz",
    "demo@pazarvadi.com",
    "0532 100 20 30",
    "Atatürk Bulvarı No:15 Daire:4",
    "Ankara",
    "Çankaya",
    "06500",
    "Yurtiçi Kargo",
    "credit_card",
    "paid",
    "shipped",
    3499.00,
    0,
    0,
    3499.00,
    "",
    "YK" + Math.floor(100000000 + Math.random() * 900000000)
  );

  const orderId = orderRes.lastInsertRowid;
  db.prepare(`
    INSERT INTO order_items (order_id, product_id, product_name, price, quantity, total, image)
    VALUES (?, 1, 'Pazarvadi Pro ANC Kablosuz Kulak Üstü Kulaklık', 3499.00, 1, 3499.00, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80')
  `).run(orderId);

  console.log(" Pazarvadi veritabanı başarıyla dolduruldu!");
}

// Allow direct run via: bun run server/seed.ts
if (import.meta.main) {
  seedData();
}

