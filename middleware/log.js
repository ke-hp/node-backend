const logger = require("pino")();
const requestIP = require("request-ip");
const { v4: uuid } = require("uuid");

module.exports = async function responseTime(ctx, next) {
  // 生成上下文日杂，附带上 requestID 做链路日志
  const { requestID = uuid() } = ctx.header;
  ctx.log = logger.child({ requestID });
  ctx.log.info({ url: ctx.url }, "路由");
  ctx.log.info({ query: ctx.query }, "请求参数");
  const ip = ctx.ip || requestIP.getClientIp(ctx.req);
  ctx.log.info({ ip: ip }, "ip");
  next();
};
