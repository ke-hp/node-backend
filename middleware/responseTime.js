module.exports = async function responseTime(ctx, next) {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.log.info({ms}, "请求处理时间");
};
