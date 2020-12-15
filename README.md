### Wechaty-hapi 脑洞机器人,实现你各种脑洞的微信机器人
[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-green.svg)](https://github.com/chatie/wechaty)
[![Wechaty开源激励计划](https://img.shields.io/badge/Wechaty-开源激励计划-green.svg)](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty)
===========================

###########部署步骤

1. npm install  //安装node运行环境

2. config 中添加对应TOKEN

3. node index.js

###########目录结构描述
├── README.md                   
├── config                          // 应用
│   └── index.js                    // 常量信息配置
├── src                         
│   ├── events                      // 配置文件
│   │   ├── index.js
│   │   ├── on-friendship.js        // 添加好友配置
│   │   ├── on-login.json           // 登录配置
│   │   ├── on-message.js           // 消息对话配置
│   │   └── on-scan.json            // 扫码配置
│   ├── utils                       
│   │   ├── api.js                  // 请求方法
│   │   └── index.js                // 工具类
│   ├── plugins                     // 插件类
│   │   ├── schedule.js             // 定时器
│   │   └── insuperagentdex.js      // 天行API
│   ├── images                      // 本地图片存放
├── node_modules
├── package.json                    // 项目配置文件
├── index.js                        // 启动项目初始化配置




### 已实现功能

- [x] 下班打卡定时
- [x] 表情包转换图片路径