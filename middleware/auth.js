const _ = require("lodash");
const to = require("await-to-js").default;

const { verify } = require("../pkg/token");
const { errRes } = require("../pkg/response");
const code = require("../code/public");

module.exports = async function (ctx, next) {
  if (!ctx?.header?.authorization) {
    ctx.log.warn("无 token ");
    ctx.throw(403, code.JWT_NO.msg);
  }

  const parts = ctx.header.authorization.split(" ");
  if (parts.length !== 2) {
    ctx.log.warn("token 格式错误");
    ctx.throw(403, code.JWT_FORMAT_ERR.msg);
  }

  // 取出token
  const scheme = parts[0];
  if (!/^Bearer$/i.test(scheme)) {
    ctx.log.warn("token 格式错误");
    ctx.throw(403, code.JWT_FORMAT_ERR.msg);
  }

  const token = parts[1];
  let err, tokenInfo;

  // jwt.verify方法验证token是否有效
  [err, tokenInfo] = await to(verify(token));
  if (_.isError(err)) {
    ctx.log.warn({ err }, "校验 token 错误");
    ctx.throw(403, code.JWT_VERIFY_ERR.msg);
  }

  await next();
};
