module.exports = {
  /**
   * @api {get} /user/:id Request User information
   * @apiName GetUser
   * @apiGroup User
   *
   * @apiParam {Number} id Users unique ID.
   *
   * @apiSuccess {String} firstname Firstname of the User.
   * @apiSuccess {String} lastname  Lastname of the User.
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
