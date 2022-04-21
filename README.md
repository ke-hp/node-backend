[TOC]
# 概述

node-base 是个人 Node.js 开发代码组织模板：简单、易用

# 版本

|   版本    |   修改人  |   修改时间    |   修改内容    |   备注    |
|---    |   --- |   --- |   --- |   --- |
|   v0.1    |   khp  |  2022-04-20 21:32:03   |   初步完成    |   无  |

# 目录

```
├── README.md
├── apidoc                // apidoc API 文档自动生成
├── apidoc.json           // apidoc 配置
├── app.js                // 项目入口
├── code                  // 项目错误码
├── config                // 项目配置
├── controller            // 控制层
├── middleware            // 中间件
├── node_modules          // 项目依赖
├── nodemon.json          // nodemon 热启动配置（开发用）
├── package-lock.json
├── package.json          // 项目 package.json
├── pkg                   // 额外pkg包
├── routers.js            // 项目路由
├── schedule              // 定时任务 
├── service               // 服务pkg层
├── store                 // 存储层
└── util                  // 工具
```

# 安装

```shell
npm i && npm i -g apidoc
```

# 运行

```shell
npm run dev
```

# 未完成
- [ ] dockerFile
- [ ] pm2
- [ ] 测试
- [ ] mysql
