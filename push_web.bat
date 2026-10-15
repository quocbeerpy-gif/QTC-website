@echo off
chcp 65001 >nul
echo ========================================================
echo   [QTC AI] DANG TIEN HANH DONG BO VA PUSH WEB LEN GITHUB
echo ========================================================

:: Chuyen vao dung thu muc chua script
cd /d "%~dp0"

:: Tu dong copy cac file can thiet (neu co)
if exist "QTC AI.html" copy /y "QTC AI.html" "index.html" >nul
if exist "HRCHealth.html" (
    if not exist "hrchealth" mkdir "hrchealth"
    copy /y "HRCHealth.html" "hrchealth\index.html" >nul
)

echo Dang kiem tra trang thai Git...
:: Luon luon Pull ve truoc de tranh loi "rejected"
git pull --rebase origin main

:: Kiem tra xem co gi thay doi khong
git add .
git status --porcelain > "%temp%\git_status.txt"

:: Kiem tra file co du lieu hay khong bang cach check size
for /f %%i in ("%temp%\git_status.txt") do set size=%%~zi
if %size% equ 0 (
    del "%temp%\git_status.txt"
    echo [THONG BAO] Khong co gi thay doi moi de push.
    timeout /t 3 >nul
    exit /b 0
)
del "%temp%\git_status.txt"

echo Dang tao ban commit...
git commit -m "Auto update web - %date% %time%"
echo Dang day code len GitHub...
git push origin main

if %errorlevel% neq 0 (
    echo.
    echo [LOI] Push khong thanh cong! Vui long kiem tra lai ket noi hoac quyen GitHub.
    pause
) else (
    echo ========================================================
    echo   [THANH CONG] DA CAP NHAT WEB XONG ROI ANH NHE!
    echo ========================================================
    timeout /t 3 >nul
)
