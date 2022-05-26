const logger = require("pino")();
const cronLog = logger.child({ module: "定时任务" });

module.exports = () => {
  cronLog.info("每10秒定时任务");
};
