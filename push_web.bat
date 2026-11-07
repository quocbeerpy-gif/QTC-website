@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo ========================================================
echo   [QTC AI] DONG BO VA PUSH WEB LEN GITHUB (VERCEL)
echo ========================================================

:: Chuyen vao dung thu muc chua script
cd /d "%~dp0"

echo [1/5] Kiem tra Git repo...
git rev-parse --is-inside-work-tree >nul 2>&1
if %errorlevel% neq 0 (
    echo [LOI] Thu muc nay khong phai Git repo!
    pause
    exit /b 1
)

echo [2/5] Dong bo voi GitHub (pull --rebase)...
git pull --rebase origin main >nul 2>&1
if %errorlevel% neq 0 (
    echo [CANH BAO] Pull --rebase that bai, thu aborts rebase...
    git rebase --abort >nul 2>&1
)

echo [3/5] Kiem tra thay doi...
git add -A
git diff --cached --quiet
if %errorlevel% equ 0 (
    echo [THONG BAO] Khong co file nao thay doi moi de push.
    timeout /t 3 >nul
    exit /b 0
)

echo [4/5] Tao commit va push...
git commit -m "Auto update web - %date% %time%"
if %errorlevel% neq 0 (
    echo [LOI] Commit that bai!
    pause
    exit /b 1
)

git push origin main
if %errorlevel% neq 0 (
    echo [CANH BAO] Push bi tu choi, thu rebase va push lai...
    git pull --rebase origin main
    git push origin main
    if !errorlevel! neq 0 (
        echo.
        echo [LOI] Push khong thanh cong! Kiem tra ket noi GitHub.
        pause
        exit /b 1
    )
)

echo [5/5] Kiem tra trang live tren Vercel...
echo Cho Vercel deploy (45 giay)...
timeout /t 45 >nul

for /f %%h in ('curl -s -o NUL -w "%%{http_code}" -L "https://qtcai.vercel.app/di-chua-online"') do set CODE=%%h

echo.
echo ========================================================
if "!CODE!"=="200" (
    echo   [THANH CONG] Da push va Vercel deploy xong!
    echo   Trang live: https://qtcai.vercel.app/di-chua-online  [!CODE!]
) else (
    echo   [CHU Y] Da push len GitHub thanh cong.
    echo   Nhung Vercel dang tra ve ma: !CODE!
    echo   Vui long kiem tra Dashboard Vercel.
)
echo ========================================================
echo.
git log --oneline -1
echo.
timeout /t 5 >nul
endlocal
