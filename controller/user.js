module.exports = {
  /**
   * This is a comment.
   */
  // 登陆
  login: (ctx) => {
    ctx.log.info({ login: "" }, "用户登陆");
    ctx.body = "login";
  },

  // changePwd
  changePwd: (ctx) => {
    ctx.body = "修改密码";
  },
};
