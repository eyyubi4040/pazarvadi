FROM oven/bun:latest

WORKDIR /app

# Bağımlılık dosyalarını kopyala ve yükle
COPY package.json bun.lock* ./
RUN bun install --production

# Tüm proje dosyalarını kopyala
COPY . .

# Veritabanı ve yükleme dizinlerini hazırla
RUN mkdir -p /app/data /app/public/uploads

# Port ortam değişkeni (Varsayılan 3000)
ENV PORT=3000
EXPOSE 3000

# Veritabanını hazırla ve sunucuyu başlat
CMD ["bun", "run", "start"]

