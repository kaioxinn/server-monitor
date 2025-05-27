# 服务器监控系统开发者指南

## 项目概述

这是一个基于 Next.js 和 Python 的现代化服务器监控系统，提供了实时资源监控、SSH 终端访问、数据可视化等功能。项目采用前后端分离架构，使用 TypeScript 确保代码质量和类型安全。

## 技术架构

### 前端技术栈
- **框架**: Next.js 15.2.4 (React 18)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI组件**: Radix UI
- **数据可视化**: Recharts
- **状态管理**: React Hooks
- **表单处理**: React Hook Form + Zod
- **HTTP客户端**: Axios

### 后端技术栈
- **Node.js**: 用于API桥接和进程管理
- **Python**: 用于SSH服务和系统监控
  - Paramiko: SSH连接管理
  - Flask: API服务

## 系统架构

### 核心组件

1. **前端应用 (Next.js)**
   - 提供用户界面和交互
   - 处理数据展示和可视化
   - 管理用户会话和认证

2. **Node.js 桥接服务**
   - 启动和管理Python SSH服务
   - 转发API请求到Python后端
   - 处理进程间通信

3. **Python SSH服务**
   - 处理SSH连接和命令执行
   - 收集系统资源数据
   - 提供REST API接口

### 数据流

1. 用户通过Web界面发起请求
2. Next.js API路由接收请求
3. Node.js桥接服务转发请求到Python后端
4. Python服务执行相应操作并返回结果
5. 数据通过桥接服务返回给前端
6. 前端更新UI展示结果

## 开发环境设置

### 系统要求
- Node.js 16.x+
- Python 3.7+
- 支持的操作系统: Windows, macOS, Linux

### 安装步骤

1. 克隆仓库
```bash
git clone https://your-repository-url/server-monitor.git
cd server-monitor
```

2. 安装依赖
```bash
# 安装Node.js依赖
npm install

# 安装Python依赖
pip install -r server/requirements.txt
```

3. 配置环境变量
创建 `.env.local` 文件并设置必要的环境变量：
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 项目结构

```
server-monitor/
├── app/                    # Next.js应用目录
│   ├── api/               # API路由
│   ├── servers/           # 服务器详情页
│   └── page.tsx           # 主页
├── components/            # React组件
│   ├── servers/           # 服务器相关组件
│   └── ui/                # UI组件库
├── lib/                   # 工具库和API客户端
├── server/                # 后端服务
│   ├── bridge.js          # Node.js桥接脚本
│   ├── ssh_service.py     # Python SSH服务
│   └── requirements.txt   # Python依赖
└── start-all.js           # 快捷启动脚本
```

## 开发指南

### 启动开发环境

1. 使用快捷启动脚本（推荐）：
```bash
# Windows
start.bat

# macOS/Linux
./start.sh
```

2. 手动启动：
```bash
# 终端1：启动SSH服务
node server/bridge.js

# 终端2：启动前端开发服务器
npm run dev
```

### 代码规范

1. **TypeScript**
   - 使用严格的类型检查
   - 避免使用 `any` 类型
   - 为所有函数和组件添加类型定义

2. **React组件**
   - 使用函数组件和Hooks
   - 遵循组件命名规范（PascalCase）
   - 实现适当的错误边界

3. **API开发**
   - 使用RESTful API设计原则
   - 实现适当的错误处理
   - 添加请求验证

### 测试

1. **单元测试**
   - 使用Jest进行组件测试
   - 使用React Testing Library进行UI测试

2. **集成测试**
   - 测试API端点
   - 测试SSH连接功能

## 部署

### 生产环境配置

1. 构建前端
```bash
npm run build
```

2. 配置环境变量
- 设置生产环境的API URL
- 配置SSL证书
- 设置适当的CORS策略

3. 启动服务
```bash
npm start
```

### 安全注意事项

1. **SSH安全**
   - 使用密钥认证而不是密码
   - 实现适当的访问控制
   - 加密敏感数据

2. **API安全**
   - 实现请求速率限制
   - 使用HTTPS
   - 实现适当的认证机制

## 故障排除

### 常见问题

1. **SSH连接失败**
   - 检查SSH服务是否正在运行
   - 验证凭据是否正确
   - 检查防火墙设置

2. **API请求失败**
   - 检查桥接服务是否运行
   - 验证API端点是否正确
   - 检查网络连接

### 日志

- 前端日志位于浏览器控制台
- 后端日志位于终端输出
- 可以配置日志文件输出

## 贡献指南

1. Fork项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 许可证

[添加许可证信息]

## 联系方式

[添加项目维护者联系方式] 