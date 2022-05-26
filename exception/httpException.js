class HttpException extends Error {
  constructor({ msg = "error", code = 400, status = 400 }) {
    super();
    this.status = status;
    this.code = code;
    this.msg = msg;
  }
}

module.exports = HttpException;
