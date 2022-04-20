const _ = require("lodash");
const to = require("await-to-js").default;
const logger = require("pino")();
const { reqNonceRedisDB } = require("../store/redis");

const log = logger.child({ module: "service:token" });

module.exports = {

    hasNone: async (nonce) => {
        let err, value;
        [err, value] = await to(reqNonceRedisDB.get(nonce));
        if (_.isEmpty(err)) {
            log.error({ err }, "获取 nonce 错误");
            return [err, null];
        }
        log.info(`查询nonce${nonce}值为${value}`);
        return [null, !_.isEmpty(value)];
    },

    setTokenByUID: async (uid, token, expSeconds) => {
        let err, res;
        [err, res] = await to(tokenRedisDB.set(uid, token));
        if (_.isEmpty(err)) {
            log.error({ err }, "设置 token 错误");
            return [err, null];
        }

        [err, res] = await to(tokenRedisDB.EXPIRE(uid, expSeconds));
        if (_.isEmpty(err)) {
            log.error({ err }, "设置 token 过期错误");
            return [err, null];
        }

        return [null, null];
    },
};
