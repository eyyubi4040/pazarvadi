import { Database } from "bun:sqlite";
import { join } from "path";
import { existsSync, mkdirSync, copyFileSync } from "fs";

const DATA_DIR = join(process.cwd(), "data");
if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR, { recursive: true });
}

const OLD_DB = join(DATA_DIR, "pazurka.sqlite");
const NEW_DB = join(DATA_DIR, "pazarvadi.sqlite");
if (existsSync(OLD_DB) && !existsSync(NEW_DB)) {
  try { copyFileSync(OLD_DB, NEW_DB); } catch {}
}

const DB_PATH = existsSync(NEW_DB) ? NEW_DB : (existsSync(OLD_DB) ? OLD_DB : NEW_DB);
export const db = new Database(DB_PATH, { create: true });

// Enable Write-Ahead Logging for high concurrency performance
db.exec("PRAGMA journal_mode = WAL;");
db.exec("PRAGMA foreign_keys = ON;");
db.exec("PRAGMA synchronous = NORMAL;");

// Update existing branding to Pazarvadi
try {
  db.exec("UPDATE products SET name = REPLACE(name, 'Pazurka', 'Pazarvadi'), slug = REPLACE(slug, 'pazurka', 'pazarvadi') WHERE name LIKE '%Pazurka%';");
  db.exec("UPDATE users SET email = REPLACE(email, 'pazurka.com', 'pazarvadi.com') WHERE email LIKE '%pazurka.com%';");
  db.exec("UPDATE coupons SET code = REPLACE(code, 'PAZURKA', 'PAZARVADI') WHERE code LIKE '%PAZURKA%';");
} catch {}

export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      full_name TEXT NOT NULL,
      phone TEXT,
      address TEXT,
      city TEXT,
      district TEXT,
      role TEXT DEFAULT 'customer',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS user_addresses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      recipient_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      city TEXT NOT NULL,
      district TEXT NOT NULL,
      address_line TEXT NOT NULL,
      zip_code TEXT,
      is_default INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      icon TEXT,
      image TEXT,
      display_order INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      short_desc TEXT,
      description TEXT,
      price REAL NOT NULL,
      compare_at_price REAL,
      sku TEXT,
      barcode TEXT,
      stock INTEGER DEFAULT 10,
      rating REAL DEFAULT 5.0,
      review_count INTEGER DEFAULT 0,
      badge TEXT,
      is_featured INTEGER DEFAULT 0,
      is_bestseller INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      images TEXT DEFAULT '[]',
      specs TEXT DEFAULT '{}',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_number TEXT UNIQUE NOT NULL,
      user_id INTEGER,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      shipping_address TEXT NOT NULL,
      city TEXT NOT NULL,
      district TEXT NOT NULL,
      postal_code TEXT,
      shipping_company TEXT DEFAULT 'Yurtiçi Kargo',
      payment_method TEXT DEFAULT 'credit_card',
      payment_status TEXT DEFAULT 'paid',
      order_status TEXT DEFAULT 'processing',
      subtotal REAL NOT NULL,
      shipping_cost REAL DEFAULT 0,
      discount_amount REAL DEFAULT 0,
      total REAL NOT NULL,
      coupon_code TEXT,
      tracking_number TEXT,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
      product_id INTEGER,
      product_name TEXT NOT NULL,
      price REAL NOT NULL,
      quantity INTEGER NOT NULL,
      total REAL NOT NULL,
      image TEXT,
      variant_info TEXT
    );

    CREATE TABLE IF NOT EXISTS coupons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      discount_type TEXT DEFAULT 'percent',
      discount_value REAL NOT NULL,
      min_spend REAL DEFAULT 0,
      max_discount REAL,
      usage_limit INTEGER DEFAULT 1000,
      usage_count INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      expires_at DATETIME
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
      user_name TEXT NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT NOT NULL,
      is_verified INTEGER DEFAULT 1,
      is_approved INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);

  console.log(" Veritabanı tabloları hazırlandı (pazurka.sqlite)");
}

