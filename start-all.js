/**
 * 快捷启动脚本 - 同时启动前端和后端服务
 * 
 * 用法: node start-all.js
 */

const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

// 颜色控制
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// 启动类型
const FRONTEND = 'frontend';
const BACKEND = 'backend';

// 获取进程输出的前缀
function getPrefix(type) {
  if (type === FRONTEND) {
    return `${colors.green}[前端]${colors.reset}`;
  }
  return `${colors.blue}[后端]${colors.reset}`;
}

// 绑定进程输出
function bindProcessOutput(process, type) {
  const prefix = getPrefix(type);
  
  process.stdout.on('data', (data) => {
    console.log(`${prefix} ${data.toString().trim()}`);
  });
  
  process.stderr.on('data', (data) => {
    console.error(`${prefix} ${colors.red}${data.toString().trim()}${colors.reset}`);
  });
  
  process.on('close', (code) => {
    if (code !== null) {
      console.log(`${prefix} 进程已退出，退出码: ${code}`);
    }
  });
}

// 启动前端 (Next.js)
function startFrontend() {
  console.log(`${colors.green}${colors.bright}启动前端 (Next.js)...${colors.reset}`);
  
  const isWindows = os.platform() === 'win32';
  const npmCommand = isWindows ? 'npm.cmd' : 'npm';
  
  const frontendProcess = spawn(npmCommand, ['run', 'dev'], {
    stdio: 'pipe',
    shell: true
  });
  
  bindProcessOutput(frontendProcess, FRONTEND);
  
  return frontendProcess;
}

// 启动后端 (SSH服务)
function startBackend() {
  console.log(`${colors.blue}${colors.bright}启动后端 (SSH服务)...${colors.reset}`);
  
  const isWindows = os.platform() === 'win32';
  const nodeCommand = isWindows ? 'node.exe' : 'node';
  
  // 启动SSH服务桥接脚本
  const backendProcess = spawn(nodeCommand, ['server/bridge.js'], {
    stdio: 'pipe',
    shell: true
  });
  
  bindProcessOutput(backendProcess, BACKEND);
  
  return backendProcess;
}

// 主函数
async function start() {
  console.log(`${colors.cyan}${colors.bright}===== 服务器监控系统 - 快捷启动 =====${colors.reset}`);
  console.log(`${colors.yellow}启动所有服务...${colors.reset}`);
  
  // 启动后端
  const backend = startBackend();
  
  // 等待一段时间让后端初始化
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // 启动前端
  const frontend = startFrontend();
  
  // 处理 Ctrl+C
  process.on('SIGINT', () => {
    console.log(`\n${colors.yellow}正在关闭所有服务...${colors.reset}`);
    
    backend.kill();
    frontend.kill();
    
    setTimeout(() => {
      console.log(`${colors.green}所有服务已关闭${colors.reset}`);
      process.exit(0);
    }, 1000);
  });
  
  console.log(`\n${colors.cyan}${colors.bright}所有服务已启动. 按 Ctrl+C 停止所有服务${colors.reset}`);
  console.log(`${colors.cyan}前端服务地址: ${colors.bright}http://localhost:3000${colors.reset}`);
}

// 启动所有服务
start().catch(error => {
  console.error(`${colors.red}启动失败:${colors.reset}`, error);
  process.exit(1);
}); 