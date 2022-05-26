const { createClient } = require("redis");
const config = require("config");
const logger = require("pino")();

const rLog = logger.child({ module: "redis 数据库" });

// token 数据库
const tokenRedisUrl = config.get("tokenRedis.url");
const tokenRedisDB = config.get("tokenRedis.db");
const tokenClient = createClient({
  url: tokenRedisUrl,
  database: tokenRedisDB,
});
tokenClient.on("error", (err) => rLog.error({ err }, "tokenRedisDB 错误"));
tokenClient.connect();

// 请求唯一 id 数据库
const reqNonceRedisUrl = config.get("reqNonceRedis.url");
const reqNonceRedisDB = config.get("reqNonceRedis.db");
const reqNonceClient = createClient({
  url: reqNonceRedisUrl,
  database: reqNonceRedisDB,
});
reqNonceClient.on("error", (err) =>
  rLog.error({ err }, "reqNonceRedisDB 错误")
);
reqNonceClient.connect();

module.exports = {
  tokenRedisDB: tokenClient,
  reqNonceRedisDB: reqNonceClient,
};
