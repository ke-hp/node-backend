const jwt = require("jsonwebtoken");
const config = require("config");

const tokenSecret = config.get("token.secret");
const exp = config.get("token.exp");

module.exports = {

};
