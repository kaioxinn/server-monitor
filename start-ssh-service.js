/**
 * SSH服务启动脚本
 * 
 * 用法: node start-ssh-service.js
 */

const { startBridge } = require('./server/bridge');

// 启动SSH服务和桥接
console.log('正在启动SSH服务...');
startBridge().catch(error => {
  console.error('启动SSH服务失败:', error);
  process.exit(1);
});

console.log('服务启动中，请保持此窗口打开...');
console.log('按Ctrl+C停止服务'); 