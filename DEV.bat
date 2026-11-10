@echo off
title Pazurka E-Ticaret (Dev Modu)
cd /d "%~dp0"
echo ============================================================
echo   PAZURKA E-TICARET (DEV MODU - OTOMATIK YENILEME)
echo ============================================================
echo.
echo Tarayicinizda: http://localhost:3000
echo.
bun run dev
pause

