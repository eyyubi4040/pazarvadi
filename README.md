# Pazarvadi - Yeni Nesil Full-Stack E-Ticaret Platformu ⚡

> **Pazarvadi**, **Bun** çalışma zamanı motoru ve yerleşik **SQLite** veritabanı altyapısıyla sıfır harici hantal bağımlılık olmaksızın geliştirilmiş, son derece hızlı, modern ve kurumsal bir e-ticaret platformudur.

![Pazarvadi Logo](public/images/pazarvadilogo.png)

---

## 🚀 Öne Çıkan Özellikler

### 🛍️ Modern Mağaza ve Alışveriş Deneyimi
- **Dinamik Ana Sayfa:** Hero vitrini, haftanın fırsatları, indirim sayaçları, popüler kategoriler, müşteri yorumları ve bülten üyeliği.
- **Zengin Ürün Kataloğu (`/urunler`):** Anlık arama, çoklu kategori filtresi, fiyat aralığı filtreleme, stok durumu, öne çıkanlar ve çok satanlar sıralaması.
- **Detaylı Ürün Sayfası (`/urun/:slug`):** Yüksek çözünürlüklü görsel galerisi, küçük resim seçici, stok sayacı, teknik özellik tablosu, iade/kargo bilgisi, doğrulanmış müşteri yorumları ve yıldızlı değerlendirme yapma formu.
- **Hızlı Yan Sepet (Slide-over Cart Drawer):** Her sayfadan tek tıkla açılan sepet çekmecesi, anlık adet güncelleme ve dinamik ücretsiz kargo ilerleme çubuğu.
- **Sepet ve Kupon Motoru (`/sepet`):** Aktif indirim kuponları doğrulaması (`PAZARVADI100`, `HOSGELDIN20`, `FIRSAT10`), otomatik kargo bedeli hesaplama ve sepet tutarı dökümü.
- **Tek Sayfada Güvenli Ödeme (`/odeme`):**
  - Teslimat ve iletişim bilgileri formu
  - Anlaşmalı kargo seçimi (Yurtiçi Kargo, Aras Kargo, MNG)
  - 3D Secure simülasyonlu Kredi/Banka Kartı, Havale/EFT ve Kapıda Ödeme seçenekleri.
- **Sipariş Onayı ve Makbuz (`/siparis-basarili`):** Sipariş ve canlı kargo takip numarası, faturası ve yazdırılabilir makbuz görünümü.
- **Canlı Sipariş Takip Sistemi (`/siparis-takip`):** Sipariş numarasıyla sorgulama, 4 adımlı görsel durum çizelgesi (Alındı ➔ Hazırlanıyor ➔ Kargoda ➔ Teslim Edildi).
- **Favori Listesi (`/favoriler`):** Beğenilen ürünleri kaydetme ve tek tıkla sepete ekleme.
- **Müşteri Portalı (`/hesabim` & `/giris`):** Profil bilgileri, sipariş geçmişi ve tek tıkla demo müşteri/admin girişi.

### ⚙️ Yönetici Kontrol Paneli (`/admin`)
- **İşletme İstatistikleri:** Toplam Ciro, Toplam Sipariş, Aktif Ürün ve Kritik Stok uyarıları.
- **Ürün Yönetimi (CRUD):** Yeni ürün ekleme (fotoğraf yükleme desteği ile), fiyat/stok düzenleme, rozet belirleme ve ürün silme.
- **Sipariş Yönetimi:** Sipariş durumunu anlık değiştirme (Hazırlanıyor, Kargolandı, Teslim Edildi), kargo takip numarası güncelleme.
- **Kupon Tanımlama:** Yüzdesel veya sabit TL indirim kuponları oluşturma.

---

## 🛠️ Teknoloji Mimarisi

- **Çalışma Zamanı (Runtime):** [Bun](https://bun.sh) (v1.4+)
- **Sunucu & API:** Bun Native HTTP Server (`Bun.serve`) - 100k+ req/sec potansiyeli
- **Veritabanı:** `bun:sqlite` (WAL - Write-Ahead Logging modu ile ultra hızlı ACID uyumlu yerel veritabanı)
- **Frontend & Tasarım:** Responsive HTML5, Tailwind CSS, Lucide Icons, Plus Jakarta Sans
- **Fotoğraf / Dosya Yükleme:** Dahili `/api/upload` endpoint'i ve yerel saklama

---

## ⚡ Kurulum ve Çalıştırma

Projeyi çalıştırmak için bilgisayarınızda **Bun** kurulu olması yeterlidir:

```bash
# Proje dizinine geçin
cd E:\projeler\pazurka

# Geliştirme (Watch) modunda başlatma
bun run dev

# veya standart üretim çalıştırması
bun run start
```

Tarayıcınızda şu adrese gidin:
👉 **http://localhost:3000**

---

## 🔑 Demo Hesaplar ve Kupon Kodları

### Giriş Hesapları
- **Yönetici (Admin):**
  - E-Posta: `admin@pazarvadi.com`
  - Şifre: `admin123`
- **Müşteri:**
  - E-Posta: `demo@pazarvadi.com`
  - Şifre: `pazarvadi123`

### Aktif İndirim Kuponları
- `PAZARVADI100` : 1000 TL üzeri alışverişlerde 100 TL indirim
- `HOSGELDIN20` : 500 TL üzeri alışverişlerde %20 indirim
- `FIRSAT10` : 250 TL üzeri alışverişlerde %10 indirim

---

## 📁 Proje Dizin Yapısı

```
E:\projeler\pazurka\
├── data\
│   └── pazurka.sqlite        # SQLite veritabanı dosyası
├── public\
│   ├── css\main.css          # Pazarvadi özel stil ve animasyonları
│   ├── images\pazarvadilogo.png# Pazarvadi resmi logosu
│   ├── js\store.js           # Sepet, favori ve API istemci motoru
│   ├── uploads\              # Yüklenen ürün görselleri
│   ├── index.html            # Ana Sayfa
│   ├── urunler.html          # Ürün Kataloğu ve Filtreleme
│   ├── urun-detay.html       # Ürün Detay Sayfası
│   ├── sepet.html            # Alışveriş Sepeti
│   ├── odeme.html            # Güvenli Ödeme
│   ├── siparis-basarili.html # Sipariş Onayı
│   ├── siparis-takip.html    # Kargo Takibi
│   ├── favoriler.html        # Favoriler
│   ├── giris.html            # Giriş & Kayıt
│   ├── hesabim.html          # Müşteri Paneli
│   ├── admin.html            # Yönetici Paneli
│   ├── hakkimizda.html       # Kurumsal Hakkımızda
│   ├── iletisim.html         # İletişim Formu
│   └── 404.html              # Hata Sayfası
├── server\
│   ├── api.ts                # REST API Rotaları ve İşleyicileri
│   ├── db.ts                 # SQLite Veritabanı Tabloları & Bağlantısı
│   ├── index.ts              # Bun HTTP Sunucusu
│   └── seed.ts               # Başlangıç Demo Verileri (Ürünler, Kuponlar, Kullanıcılar)
└── package.json
```

