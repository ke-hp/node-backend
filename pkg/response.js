const { NORMAL } = require("../code/public");

module.exports = {
  res: (ctx, result) => {
    ctx.body = {
      code: NORMAL.code,
      msg: NORMAL.msg,
      data: result,
    };
  },
};
