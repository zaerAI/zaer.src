@echo off

pip show pyinstaller >nul 2>&1
if errorlevel 1 (
    echo PyInstaller not found. Installing...
    pip install pyinstaller
)

setlocal enabledelayedexpansion

set SCRIPT_DIR=%~dp0
set ICON_PATH=%SCRIPT_DIR%favicon.ico
set OUTPUT_DIR=%SCRIPT_DIR%dist
set BUILD_DIR=%SCRIPT_DIR%build

echo Building ZAER executable...
echo Script directory: %SCRIPT_DIR%
echo Icon path: %ICON_PATH%

if exist "%OUTPUT_DIR%" (
    rmdir /s /q "%OUTPUT_DIR%"
)
if exist "%BUILD_DIR%" (
    rmdir /s /q "%BUILD_DIR%"
)

pyinstaller --onefile --windowed --name ZAER ^
    --icon "%ICON_PATH%" ^
    --add-data "%ICON_PATH%;ZAER_assets" ^
    --distpath "%OUTPUT_DIR%" ^
    --workpath "%BUILD_DIR%" ^
    --specpath "%BUILD_DIR%" ^
    --clean --noconfirm "%SCRIPT_DIR%main.py"

if errorlevel 1 (
    echo.
    echo Build failed. Check output above for details.
    pause
    exit /b 1
)

echo.
echo Build complete!
echo Executable location: %OUTPUT_DIR%\ZAER.exe
pause
endlocal