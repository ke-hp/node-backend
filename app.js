const logger = require("pino")()
const koa = require("koa");
const config = require("config")

const app = new koa();
const httpPort = config.get("http.port")
const appLog = logger.child({module:"app"})

appLog.info("启动项目")

// 加载数据库
require("./store/mongo")

// 加载中间件
require("./middleware")(app);

// 加载路由
require("./routers")(app);

// 加载定时任务
require("./schedule")

// 启动项目
appLog.info('项目监听端口 %d',httpPort)
app.listen(httpPort);
