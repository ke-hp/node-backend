const _ = require("lodash");
const logger = require("pino")();
const requireDirectory = require("require-directory");

const mLog = logger.child({ module: "中间件" });

module.exports = (app) => {
  const m = requireDirectory(module);

  if (!_.isEmpty(app)) {
    mLog.info("加载中...");
    app.use(m.log);
    app.use(m.responseTime);
  }

  return m;
};
