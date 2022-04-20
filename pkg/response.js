const { NORMAL } = require("../code/public");

module.exports = {
  res: (ctx, result) => {
    ctx.body = {
      code: NORMAL.code,
      msg: NORMAL.msg,
      data: result,
    };
  },

  errRes: (ctx, errCode = { code: 100001, msg: "", data: null }, msg = "") => {
    ctx.body = {
      code: errCode.code,
      msg: msg ? msg : errCode.msg,
      data: null,
    };
  },
};
