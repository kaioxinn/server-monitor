@echo off
echo 正在启动服务器监控系统...

REM 检查是否安装Node.js
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
  echo 错误: 未找到Node.js! 请安装Node.js后重试。
  echo 可以从 https://nodejs.org 下载Node.js
  pause
  exit /b 1
)

REM 检查是否安装Python (用于SSH服务)
where python >nul 2>nul
if %ERRORLEVEL% neq 0 (
  echo 警告: 未找到Python! SSH服务可能无法正常工作。
  echo 可以从 https://www.python.org 下载Python
  echo.
  echo 按任意键继续...
  pause >nul
)

REM 安装依赖
echo 检查依赖...
call npm install axios
echo 安装Python依赖...
pip install -r server/requirements.txt

REM 启动所有服务
echo 启动所有服务...
node start-all.js

REM 如果start-all.js出错，等待用户按键
if %ERRORLEVEL% neq 0 (
  echo.
  echo 启动服务时出错！请查看上面的错误信息。
  echo.
  pause
) 