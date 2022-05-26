const { db } = require("../store/mongo");
const to = require("await-to-js").default;

// 起始值
// uid
const UID_START_NUM = 100000;

const counter = async (_id, start) => {
  let err, result;
  [err, result] = await to(
    db.Counters.findOneAndUpdate(
      { _id: _id },
      { $inc: { next: 1 } },
      {
        new: true,
        upsert: true,
      }
    )
  );
  return result.next + start;
};

module.exports = {
  // 用户id
  uid: () => {
    return counter("uid", UID_START_NUM);
  },
};
