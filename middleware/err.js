const to = require("await-to-js").default;

const HttpException = require("../exception/httpException");

module.exports = async (ctx, next) => {
  const [err] = await to(next());
  if (err instanceof HttpException) {
    ctx.response.status = err.status;
    return (ctx.body = {
      code: err.code,
      msg: err.msg,
    });
  } else {
    console.error(err);
  }
};
