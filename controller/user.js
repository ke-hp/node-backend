const to = require("await-to-js").default;
const _ = require("lodash");
const { v4: uuidV4 } = require("uuid");
const crypto = require("crypto");

const { res, errRes } = require("../pkg/response");
const publicCode = require("../code/public");
const userCode = require("../code/user");
const { getUserInfoByName, addUser } = require("../service/user");
const { sign } = require("../pkg/token");

module.exports = {
  /**
   * @api {post} /signup 注册
   * @apiName signup
   * @apiGroup 基础接口
   *
   * @apiParam {String} account 用户名
   * @apiParam {String} password 密码
   *
   * @apiSuccess {Number} uid uid
   */
  // 注册
  signup: async (ctx) => {
    let err, sErr, userInfo, token;
    const { username = "", password = "" } = ctx.request.body;
    if (_.isEmpty(username) || _.isEmpty(password)) {
      errRes(ctx, publicCode.REQ_ARG_ERR, "用户名｜密码参数缺失");
      return;
    }

    [err, userInfo] = await to(getUserInfoByName(username));
    if (_.isError(err)) {
      ctx.log.error({ err }, "查询用户错误");
      errRes(ctx, publicCode.DATA_ERR);
      return;
    }

    if (!_.isEmpty(userInfo)) {
      ctx.log.warn("用户已存在");
      errRes(ctx, publicCode.DATA_EXISTING, "用户已存在");
      return;
    }

    userInfo = { username };
    userInfo.salt = uuidV4();
    userInfo.password = crypto
      .pbkdf2Sync(password, userInfo.salt, 1000, 64, "sha512")
      .toString("hex");

    [err, userInfo] = await to(addUser(userInfo));
    if (_.isError(err)) {
      ctx.log.error({ err }, "增加用户错误");
      errRes(ctx, publicCode.DATA_ERR);
      return;
    }

    [err, token] = await to(sign(userInfo.uid));
    if (_.isError(err)) {
      ctx.log.error({ err }, "签发 token 错误");
      errRes(ctx, publicCode.JWT_SIGN_ERR);
      return;
    }

    res(ctx, {
      uid: userInfo.uid,
      token,
    });
  },

  /**
   * @api {post} /signin 登陆
   * @apiName signin
   * @apiGroup 基础接口
   *
   * @apiParam {String} account 用户名
   * @apiParam {String} password 密码
   *
   * @apiSuccess {String} token token
   */
  // 登陆
  signin: async (ctx) => {
    let err, userInfo;
    const { username = "", password = "" } = ctx.request.body;
    if (_.isEmpty(username) || _.isEmpty(password)) {
      errRes(ctx, publicCode.REQ_ARG_ERR, "用户名｜密码参数缺失");
    }

    [err, userInfo] = await to(getUserInfoByName(username));
    if (_.isError(err)) {
      ctx.log.error({ err }, "查询用户错误");
      errRes(ctx, publicCode.DATA_ERR);
      return;
    }
    if (_.isNull(userInfo)) {
      ctx.log.warn("查询用户不存在");
      errRes(ctx, publicCode.DATA_EXISTING, "用户名或密码错误");
      return;
    }

    const passwordHash = crypto
      .pbkdf2Sync(password, userInfo.salt, 1000, 64, "sha512")
      .toString("hex");

    if (passwordHash !== userInfo.password) {
      ctx.log.warn("密码错误");
      errRes(ctx, userCode.USER_PWD_ERR, "用户名或密码错误");
    }

    // 签发token

    res(ctx, {});
  },

  /**
   * @api {post} /signout 登出
   * @apiName signout
   * @apiGroup 基础接口
   */
  // 退出
  signout: (ctx) => {
    ctx.body = "修改密码";
    // todo 返回token
  },

  changePassword: (ctx) => {
    ctx.body = "修改密码";
  },
};
