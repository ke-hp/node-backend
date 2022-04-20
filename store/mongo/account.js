const { Schema } = require("mongoose");

// 用户
let schema = new Schema(
  {
    uid: {
      unique: true,
      index: true,
      type: Number,
      name: "用户id",
    },
    version: {
      type: Number,
      name: "用户表版本", // 用户重大变更时变更版本，使其重新登录
      default: 0,
    },
    tokenVersion: {
      type: Number,
      name: "用户token表版本",
      default: 0,
    },
    username: {
      unique: true,
      index: true,
      type: String,
      name: "用户名",
    },
    salt: {
      type: String,
      name: "密码盐",
    },
    password: {
      type: String,
      name: "密码",
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

schema.statics = {
  // 静态方法
};

module.exports = schema;
