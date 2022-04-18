const { Schema } = require("mongoose");

// 用户
let schema = new Schema(
  {
    version: {
      type: Number,
      name: "用户表版本",
    },
    name: {
      type: String,
      name: "用户名",
    },
    pwd: {
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

module.exports = schema
