#!/bin/bash

echo "正在启动服务器监控系统..."

# 定义颜色
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m' # 无颜色

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}错误: 未找到Node.js! 请安装Node.js后重试${NC}"
    echo "可以从 https://nodejs.org 下载Node.js"
    exit 1
fi

# 检查Python
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    echo -e "${YELLOW}警告: 未找到Python! SSH服务可能无法正常工作${NC}"
    echo "可以从 https://www.python.org 下载Python"
    echo ""
    read -p "按Enter键继续..."
fi

# 安装依赖
echo "检查依赖..."
npm install axios
echo "安装Python依赖..."
if command -v python3 &> /dev/null; then
    python3 -m pip install -r server/requirements.txt
else
    python -m pip install -r server/requirements.txt
fi

# 设置可执行权限
chmod +x server/bridge.js
chmod +x start-all.js

# 启动所有服务
echo -e "${GREEN}启动所有服务...${NC}"
node start-all.js

# 如果进程异常退出，等待用户按键
if [ $? -ne 0 ]; then
    echo ""
    echo -e "${RED}启动服务时出错！请查看上面的错误信息${NC}"
    echo ""
    read -p "按Enter键退出..."
fi 