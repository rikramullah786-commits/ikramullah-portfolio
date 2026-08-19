@echo off
setlocal
cd /d "%~dp0"
echo ================================================
echo   IKRAMULLAH PORTFOLIO
 echo ================================================
echo.
if not exist "client\node_modules" (
  echo Installing client dependencies...
  call npm --prefix client install
)
if not exist "server\node_modules" (
  echo Installing server dependencies...
  call npm --prefix server install
)
echo.
echo Starting API and frontend...
call npm run dev
