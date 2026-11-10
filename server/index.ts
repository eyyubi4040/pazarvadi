import { initDatabase } from "./db";
import { seedData } from "./seed";
import { handleApi } from "./api";
import { join, extname } from "path";
import { existsSync } from "fs";

const PORT = Number(process.env.PORT) || 3000;
const PUBLIC_DIR = join(process.cwd(), "public");

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf"
};

// Initialize DB and ensure demo seed data exists
initDatabase();
seedData();

async function handleRequest(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // 1. API Endpoints
  if (pathname.startsWith("/api/")) {
    return handleApi(req, url);
  }

  // 1.5 Clean URL Enforcement: Redirect any .html request to its clean URL
  if (pathname.endsWith(".html")) {
    let cleanPath = pathname.slice(0, -5);
    if (cleanPath === "/index") cleanPath = "/";
    const target = cleanPath + (url.search || "");
    return new Response(null, {
      status: 301,
      headers: { "Location": target }
    });
  }

  // 2. Clean URL Routing map
  const routeMap: Record<string, string> = {
    "/": "index.html",
    "/urunler": "urunler.html",
    "/urun-detay": "urun-detay.html",
    "/sepet": "sepet.html",
    "/odeme": "odeme.html",
    "/siparis-basarili": "siparis-basarili.html",
    "/siparis-takip": "siparis-takip.html",
    "/favoriler": "favoriler.html",
    "/giris": "giris.html",
    "/hesabim": "hesabim.html",
    "/hakkimizda": "hakkimizda.html",
    "/iletisim": "iletisim.html",
    "/admin": "admin.html"
  };

  const normalizedPath = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

  // Product detail route rewrite: /urun/xyz -> urun-detay.html
  if (normalizedPath.startsWith("/urun/")) {
    const filePath = join(PUBLIC_DIR, "urun-detay.html");
    if (existsSync(filePath)) {
      return new Response(Bun.file(filePath), {
        headers: { "Content-Type": "text/html; charset=utf-8" }
      });
    }
  }

  let targetFile = "";
  if (routeMap[normalizedPath]) {
    targetFile = join(PUBLIC_DIR, routeMap[normalizedPath]);
  } else {
    // Direct static file request
    const safePath = pathname.replace(/^\/+/, "");
    targetFile = join(PUBLIC_DIR, safePath);
  }

  // If file exists, serve it
  if (existsSync(targetFile)) {
    const ext = extname(targetFile).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    const file = Bun.file(targetFile);

    return new Response(file, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=86400",
        "X-Content-Type-Options": "nosniff"
      }
    });
  }

  // If request ends without extension, check for .html
  if (!extname(targetFile)) {
    const htmlFile = targetFile + ".html";
    if (existsSync(htmlFile)) {
      return new Response(Bun.file(htmlFile), {
        headers: { "Content-Type": "text/html; charset=utf-8" }
      });
    }
  }

  // 404 Not Found Page
  const notFoundPage = join(PUBLIC_DIR, "404.html");
  if (existsSync(notFoundPage)) {
    return new Response(Bun.file(notFoundPage), {
      status: 404,
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }

  return new Response("404 Sayfa Bulunamadı - Pazarvadi", {
    status: 404,
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}

// 1. Primary Server (Port 3000)
const server = Bun.serve({
  port: PORT,
  fetch: handleRequest
});

// 2. Standard HTTP Port (Port 80 - lets user access http://pazurka/ without typing :3000)
let server80: any = null;
if (PORT !== 80) {
  try {
    server80 = Bun.serve({
      port: 80,
      fetch: handleRequest
    });
  } catch {}
}

console.log("\n============================================================");
console.log("🚀 PAZARVADI E-TİCARET PLATFORMU ÇALIŞIYOR (BUN NATIVE)");
console.log("============================================================");
console.log("🌐 Alan Adı:       http://pazarvadi/  (veya http://pazarvadi:3000/)");
console.log(`🌐 Localhost:      http://localhost:${PORT}/  (ve http://localhost/)`);
console.log(`🛍️  Ürün Kataloğu:  http://pazarvadi/urunler`);
console.log(`🛒 Sepet:          http://pazarvadi/sepet`);
console.log(`📦 Sipariş Takip:  http://pazarvadi/siparis-takip`);
console.log(`⚙️  Yönetim Paneli: http://pazarvadi/admin`);
console.log("============================================================\n");

