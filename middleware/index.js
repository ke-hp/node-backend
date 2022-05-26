const _ = require("lodash");
const static = require("koa-static");
const mount = require("koa-mount");
const path = require("path");
const body = require("koa-body")
const logger = require("pino")();
const requireDirectory = require("require-directory");

const mLog = logger.child({ module: "中间件" });

module.exports = (app) => {
  const m = requireDirectory(module);

  if (!_.isEmpty(app)) {
    mLog.info("加载中...");
    app.use(m.err)
    app.use(mount("/apidoc", static(path.join(__dirname, "../apidoc")))); // 静态
    app.use(body())
    app.use(m.log); // 加载日志器
    app.use(m.responseTime); // 计算加载时间
  }

  return m;
};
