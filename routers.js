const Router = require("koa-router");
const logger = require("pino")();
const c = require("./controller");
const m = require("./middleware")();

const rLog = logger.child({ module: "路由" });

// 写入配置中
const baseR = new Router({ prefix: "/v1" });
const authR = new Router({ prefix: "/v1" });

// 基础路由 登陆 静态 等无需验证的路由
baseR.post("/login", c.user.login);
baseR.get("/login", c.user.login);

// 需要验证路由
authR.post("changePwd", c.user.changePwd);

module.exports = (app) => {
  app.use(baseR.routes()).use(baseR.allowedMethods());
  app.use(m.auth, authR.routes()).use(authR.allowedMethods());
  return {};
};
