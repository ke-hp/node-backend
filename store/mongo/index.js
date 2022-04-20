const mongoose = require("mongoose");
const config = require("config");
const requireDirectory = require("require-directory");
const mongoUrl = config.get("mongoUrl");
mongoose.Promise = global.Promise;
const schemaList = requireDirectory(module);
const logger = require("pino")();

const mLog = logger.child({ model: "mongo数据库" });
const DBConn = mongoose.createConnection(mongoUrl);

DBConn.on("error", (err) => {
  mLog.error({ err }, "数据库错误");
});

let collection = {};

for (let e in schemaList) {
  const MKey = e.charAt(0).toUpperCase() + e.slice(1);
  collection[MKey] = DBConn.model(MKey, schemaList[e]);
}

// collection.Account.create({ name: "tset" });

module.exports = {
  db: collection,
};
