const { Schema } = require("mongoose");

// 用户
let schema = new Schema(
  {
    _id: {
      type: String,
      default: "uid",
    },

    next: {
      type: Number,
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
