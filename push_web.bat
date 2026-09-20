@echo off
chcp 65001 >nul
echo ========================================================
echo   [QTC AI] DANG TIEN HANH DONG BO VA PUSH WEB LEN GITHUB
echo ========================================================
cd /d "C:\Users\Thien Phu\.openclaw\workspace\web_public"

git status --porcelain > "%temp%\git_status.txt"
set /p STATUS=<"%temp%\git_status.txt"
del "%temp%\git_status.txt"

if "%STATUS%"=="" (
    echo.
    echo [THONG BAO] Khong co file nao thay doi moi! Tat ca da duoc dong bo len GitHub roi anh nhe.
    echo.
    timeout /t 3 >nul
    exit /b 0
)

echo Dang them file va tao ban commit...
git add .
git commit -m "Auto update web QTC AI - %date% %time%"
git push origin main

if %errorlevel% neq 0 (
    echo.
    echo [LOI] Push khong thanh cong! Vui long kiem tra lai ket noi hoac quyen truy cap GitHub.
    echo.
    pause
) else (
    echo.
    echo ========================================================
    echo   [THANH CONG] DA PUSH CODE MOI LEN GITHUB THANH CONG!
    echo ========================================================
    echo.
    timeout /t 3 >nul
)
