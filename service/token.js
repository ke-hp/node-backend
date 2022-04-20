const _ = require("lodash");
const to = require("await-to-js").default;
const logger = require("pino")();
const { tokenRedisDB } = require("../store/redis");

const log = logger.child({ module: "service:token" });

module.exports = {
  getTokenByUid: async (uid) => {
    let err, token;
    [err, token] = await to(tokenRedisDB.get(uid));
    if (_.isEmpty(err)) {
      log.error({ err }, "获取 token 错误");
      throw err;
    }
    log.info(`查询uid${uid}的token ${token}`);
    return token;
  },

  setTokenByUid: async (uid, token, expSeconds) => {
    let err, res;
    [err, res] = await to(tokenRedisDB.set(uid, token));
    if (_.isEmpty(err)) {
      log.error({ err }, "设置 token 错误");
      throw err;
    }

    [err, res] = await to(tokenRedisDB.EXPIRE(uid, expSeconds));
    if (_.isEmpty(err)) {
      log.error({ err }, "设置 token 过期错误");
      throw err;
    }
    return null;
  },
};
