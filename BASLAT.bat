@echo off
title Pazurka E-Ticaret Sunucusu (Bun)
cd /d "%~dp0"
echo ============================================================
echo   PAZURKA E-TICARET PLATFORMU BASLATILIYOR (BUN NATIVE)
echo ============================================================
echo.
echo Tarayicinizda acmak icin: http://localhost:3000
echo Yonetim Paneli:           http://localhost:3000/admin
echo.
bun run start
pause

