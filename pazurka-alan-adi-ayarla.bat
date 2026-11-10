@echo off
:: UTF-8 karakter destegi
chcp 65001 >nul

echo ============================================================
echo   PAZURKA YEREL ALAN ADI AYARLAMA ARACI
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

findstr /i "pazurka" "%HOSTS%" >nul
if %errorlevel% equ 0 (
    echo [OK] 'pazurka' zaten hosts dosyanizda tanimli!
) else (
    echo. >> "%HOSTS%"
    echo # Pazurka E-Ticaret Yerel Yonlendirmesi >> "%HOSTS%"
    echo 127.0.0.1 pazurka >> "%HOSTS%"
    echo 127.0.0.1 pazurka.local >> "%HOSTS%"
    echo 127.0.0.1 www.pazurka.com >> "%HOSTS%"
    echo [BASARILI] 'pazurka' alan adi Windows hosts dosyasina eklendi!
)

:: DNS onbellegini temizle
ipconfig /flushdns >nul

echo.
echo ============================================================
echo   ISLEM TAMAMLANDI!
echo   Artik tarayicinizdan (Chrome, Edge vb.) direkt su sekilde
echo   giris yapabilirsiniz:
echo.
echo      http://pazurka/
echo      http://pazurka/urunler
echo      http://pazurka/admin
echo.
echo ============================================================
echo.
pause

