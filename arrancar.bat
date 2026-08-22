@echo off
chcp 65001 >nul
title Moti - servidor de desarrollo
cd /d "%~dp0"

echo.
echo   ===========================================
echo    MOTI - arrancando servidor de desarrollo
echo   ===========================================
echo.

if not exist node_modules (
  echo   [1/3] Instalando dependencias, espere...
  call npm install
) else (
  echo   [1/3] Dependencias ya instaladas.
)

echo.
echo   [2/3] Autorizando el compilador esbuild...
call npm approve-scripts esbuild >nul 2>&1
call npm rebuild esbuild >nul 2>&1
echo         listo.

echo.
echo   [3/3] Levantando el servidor...
echo.
echo   Cuando aparezca la direccion http://localhost:5173
echo   se abre sola en el navegador.
echo.
echo   Para apagar el servidor: cierre esta ventana o Ctrl+C
echo.

start "" http://localhost:5173
call npm run dev

echo.
echo   El servidor se detuvo.
pause
