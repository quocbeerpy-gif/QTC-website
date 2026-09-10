@echo off
chcp 65001 >nul
echo [QTC AI] Dang tien hanh kiem tra va push web len GitHub...
cd /d C:\Users\Thien Phu\.openclaw\workspace\web_public

git add .
git commit -m "Auto update web QTC AI - %date% %time%"
git push origin main

if %errorlevel% neq 0 (
    echo.
    echo [LOI] Push khong thanh cong! Co the bi chan do lo key hoac xung đột.
    pause
) else (
    echo.
    echo [THANH CONG] Da push code len GitHub thanh cong!
    timeout /t 3 >nul
)
