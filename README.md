# 服务器监控系统

一个基于Next.js和Python的服务器监控系统，提供实时资源监控和SSH终端功能。

## 功能特点

- 📊 **资源监控**：实时监控服务器CPU、内存、磁盘和网络使用情况
- 🖥️ **SSH终端**：通过Web界面安全地连接到服务器并执行命令
- 📈 **数据可视化**：通过交互式图表展示服务器性能数据
- 🔔 **告警系统**：关键指标超出阈值时自动告警
- 📱 **响应式设计**：支持各种设备访问，包括移动设备

## 快速开始

### 系统要求

- Node.js 16.x 或更高版本
- Python 3.7 或更高版本
- 支持 Windows, macOS 和 Linux

### 安装

1. 克隆此仓库：

```bash
git clone https://your-repository-url/server-monitor.git
cd server-monitor
```

2. 安装依赖：

```bash
npm install
pip install -r server/requirements.txt
```

### 启动应用

#### 使用快捷启动脚本（推荐）

**Windows**:
- 双击 `start.bat` 文件，或在命令行中运行：
  ```
  start.bat
  ```

**macOS / Linux**:
- 在终端中运行：
  ```
  chmod +x start.sh
  ./start.sh
  ```

#### 手动启动

1. 启动SSH服务（后端）：
   ```
   node server/bridge.js
   ```

2. 在另一个终端窗口中启动前端服务：
   ```
   npm run dev
   ```

3. 访问网页: http://localhost:3000

## 技术栈

- **前端**: Next.js, React, TypeScript, Tailwind CSS, Recharts
- **后端**: Node.js, Python (Paramiko), Flask
- **其他**: Axios, Zod

## 安全说明

- 敏感信息（如SSH密码和私钥）仅在服务器端处理，不会暴露给客户端
- 建议在生产环境中使用HTTPS和额外的身份验证

## 开发指南

### 项目结构

```
server-monitor/
├── app/                    # Next.js应用目录
│   ├── api/                # API路由
│   ├── servers/            # 服务器详情页
├── components/             # React组件
│   ├── servers/            # 服务器相关组件
│   ├── ui/                 # UI组件库
├── lib/                    # 工具库和API客户端
├── server/                 # 后端服务
│   ├── bridge.js           # Node.js桥接脚本
│   ├── ssh_service.py      # Python SSH服务
└── start-all.js            # 快捷启动脚本
```

### 自定义配置

- 编辑 `.env.local` 文件可修改应用配置 