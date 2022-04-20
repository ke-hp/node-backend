const Router = require("koa-router");
const logger = require("pino")();
const c = require("./controller");
const m = require("./middleware")();

const rLog = logger.child({ module: "路由" });

// 写入配置中
const baseR = new Router({ prefix: "/v1" });
const authR = new Router({ prefix: "/v1" });

// 基础路由 无需验证
baseR.get("/hello", c.hello.hello); // 你好世界
baseR.post("/signup", c.user.signup); // 注册
baseR.post("/signin", c.user.signin); // 登录
baseR.post("/signup", c.user.signout); // 登出

// 鉴权路由 需要验证路由
authR.use(m.auth); // 注册鉴权中间件
authR.put("/change-password", c.user.changePassword);

module.exports = (app) => {
  app.use(baseR.routes()).use(baseR.allowedMethods());
  app.use(authR.routes()).use(authR.allowedMethods());
  return {};
};
