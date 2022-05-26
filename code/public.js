const { verify } = require("../pkg/token");
module.exports = {
  /**
   * 100001
   * 10 表示服务
   * 00 表示模块
   * 01 表示模块里具体错误，每个模块可以注册 100 个错误
   * */

  // 正常
  NORMAL: { code: 100000, msg: "OK" },

  // 1001xx 数据库错误
  DATA_ERR: { code: 100101, msg: "查询数据出错" },
  DATA_NOT_FOUND: { code: 100102, msg: "数据不存在" },
  DATA_EXISTING: { code: 100103, msg: "数据已存在" },

  // 1002xx 请求相关错误
  REQ_ARG_ERR: { code: 100201, msg: "请求参数错误" },

  // 1003xx jwt 模块
  JWT_NO: { code: 100301, msg: "无 token" },
  JWT_FORMAT_ERR: { code: 100302, msg: "token 格式错误" },
  JWT_EXP: { code: 100303, msg: "token 过期" },
  JWT_SIGN_ERR: { code: 100304, msg: "签发 token 错误" },
  JWT_VERIFY_ERR: { code: 100305, msg: "校验 token 错误" },
};
