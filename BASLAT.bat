@echo off
title Pazarvadi E-Ticaret Sunucusu (Bun)
cd /d "%~dp0"
echo ============================================================
echo   PAZARVADI E-TICARET PLATFORMU BASLATILIYOR (BUN NATIVE)
echo ============================================================
echo.
echo Tarayicinizda acmak icin: http://localhost:3000
echo Yonetim Paneli:           http://localhost:3000/admin
echo.
bun run start
pause

