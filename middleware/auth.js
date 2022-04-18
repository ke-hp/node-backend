const logger = require("pino")();
const { v4: uuid } = require("uuid");

module.exports = async function responseTime(ctx, next) {

  ctx.log.info("开始鉴权");
  next();
};
