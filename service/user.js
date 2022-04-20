const to = require("await-to-js").default;
const logger = require("pino")();

const log = logger.child({ module: "service:user" });

const { uid } = require("../pkg/counters");
const { db } = require("../store/mongo");

module.exports = {
  getUserInfoByName: async (name = "") => {
    return db.Account.findOne({ username: name });
  },

  getUserInfoByUid: async (uid) => {
    return db.Account.findOne({ uid });
  },

  addUser: async (info) => {
    info.uid = await uid();
    return db.Account.create(info);
  },

  tokenVersionInc: async (uid) => {
    let err, result;
    [err, result] = await to(
      db.Account.findOneAndUpdate(
        { uid },
        {
          $inc: { tokenVersion: 1 },
        },
        {
          new: true,
        }
      )
    );
    if (err) {
      throw err;
    }
    return result;
  },
};
