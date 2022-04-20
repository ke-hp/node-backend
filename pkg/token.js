const _ = require("lodash");
const to = require("await-to-js").default;
const jwt = require("jsonwebtoken");
const logger = require("pino")();
const config = require("config");

const log = logger.child({ module: "pkg:token" });
const { tokenVersionInc } = require("../service/user");
const { setTokenByUid } = require("../service/token");
const { getUserInfoByUid } = require("../service/user");

const tokenSysVsersion = config.get("token.version");
const exp = config.get("token.exp");
const secret = config.get("token.secret");

module.exports = {
  // 签发 token
  sign: async (uid) => {
    let err, userInfo;
    // 用户token 升级 1
    // redis 重置token

    [err, userInfo] = await to(tokenVersionInc(uid));
    if (_.isError(err)) {
      log.info({ err }, "用户token version 递增错误");
      throw err;
    }
    const { tokenVersion, version } = userInfo;

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + exp,
        uid: uid,
        tV: tokenVersion, // token 版本
        uV: version, // 用户版本
        sysV: tokenSysVsersion,
      },
      secret
    );

    [err, result] = await to(setTokenByUid(uid, token, exp));
    if (_.isError(err)) {
      throw err;
    }
    return token;
  },

  // 校验
  verify: async (token) => {
    let err, userInfo, tokenInfo;
    tokenInfo = jwt.verify(token, secret);

    [err, userInfo] = await to(getUserInfoByUid(tokenInfo.uid));
    if (_.isError(err)) {
      log.error({ err }, "根据 uid 查询用户错误");
      throw err;
    }

    // { exp: 1651061617, id: 100021, tV: 1, uV: 0, sysV: 0, iat: 1650456817 }

    const { tV, uV, sysV } = tokenInfo;
    const { tokenVersion, version } = userInfo;

    if (tV !== tokenVersion) {
      log.warn("token 版本不一致");
      throw "token 版本不一致";
    }

    if (uV !== version) {
      log.warn("用户版本不一致");
      throw "用户版本不一致";
    }

    if (sysV !== tokenSysVsersion) {
      log.warn("系统版本不一致");
      throw "系统版本不一致";
    }

    return tokenInfo;
  },
};
