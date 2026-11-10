@echo off
chcp 65001 >nul
title Pazarvadi E-Ticaret Sunucusu

echo ============================================================
echo   PAZARVADI E-TICARET SUNUCUSU BASLATILIYOR
echo ============================================================
echo.

cd /d "%~dp0"

:: Tarayıcıyı aç
echo [1/2] Tarayici aciliyor...
start http://localhost:3000/

:: Sunucuyu başlat
echo [2/2] Sunucu calisiyor... (Kapatmak icin bu pencereyi kapatabilirsiniz)
bun run start

pause

