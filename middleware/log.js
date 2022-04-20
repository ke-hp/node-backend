const logger = require("pino")();
const requestIP = require("request-ip");
const { v4: uuid } = require("uuid");

module.exports = async function (ctx, next) {
  // 生成上下文日杂，附带上 requestID 做链路日志
  const { requestID = uuid() } = ctx.header;
  ctx.log = logger.child({ requestID });
  ctx.log.info({ url: ctx.url }, "请求路由");
  ctx.log.info({ query: ctx.request.query }, "请求参数");
  const ip = ctx.ip || requestIP.getClientIp(ctx.req);
  ctx.log.info({ ip: ip }, "请求ip");
  await next();
  ctx.log.info({ body: ctx.body }, "返回内容");
};
