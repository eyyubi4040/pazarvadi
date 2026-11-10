@echo off
:: UTF-8 karakter destegi
chcp 65001 >nul

echo ============================================================
echo   PAZARVADI YEREL ALAN ADI AYARLAMA ARACI
echo ============================================================
echo.

:: Yonetici haklari kontrolu
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo [BILGI] Yonetici haklari gerekiyor. Lutfen acilan pencereye EVET deyiniz...
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

set HOSTS=%WINDIR%\System32\drivers\etc\hosts

findstr /i "pazarvadi" "%HOSTS%" >nul
if %errorlevel% equ 0 (
    echo [OK] 'pazarvadi' zaten hosts dosyanizda tanimli!
) else (
    echo. >> "%HOSTS%"
    echo # Pazarvadi E-Ticaret Yerel Yonlendirmesi >> "%HOSTS%"
    echo 127.0.0.1 pazarvadi >> "%HOSTS%"
    echo 127.0.0.1 pazarvadi.local >> "%HOSTS%"
    echo 127.0.0.1 pazarvadi.com >> "%HOSTS%"
    echo 127.0.0.1 www.pazarvadi.com >> "%HOSTS%"
    echo [BASARILI] 'pazarvadi' alan adi Windows hosts dosyasina eklendi!
)

:: DNS onbellegini temizle
ipconfig /flushdns >nul

echo.
echo ============================================================
echo   ISLEM TAMAMLANDI!
echo   Artik tarayicinizdan (Chrome, Edge vb.) direkt su sekilde
echo   giris yapabilirsiniz:
echo.
echo      http://pazarvadi/
echo      http://pazarvadi.com/
echo      http://pazarvadi/urunler
echo      http://pazarvadi/admin
echo.
echo ============================================================
echo.
pause
