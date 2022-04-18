module.exports = async function responseTime(ctx, next) {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.log.info("ResponseTime", ms);
  ctx.set("X-Response-Time", `${ms}ms`);
};
