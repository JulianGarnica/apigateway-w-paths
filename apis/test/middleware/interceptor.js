//Const of module required
const jwt = require("jsonwebtoken");
const config = require("../../../config.json")["development"];

const SECRET_KEY = config.secret_key;

function interceptor(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (!err) {
        req.user = user;
      }
      next();
    });
  } else {
    next();
  }
}

module.exports = interceptor;