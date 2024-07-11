//Const of module required
const { body } = require("express-validator");

exports.registerValidator = [
  body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
  body("nit").isString().withMessage("Required nit"),
  body("name").isString().withMessage("Required name"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

exports.loginValidator = [
  body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
  //body("password").isLength({ min: 6 }).withMessage("Invalid password"),
  body("password").isLength({ min: 1 }).withMessage("Invalid password"),
];

exports.permissionsValidator = [
  body("userid").isInt().withMessage("Invalid userid"),
  body("actionid").isInt().withMessage("Invalid actionid")
];
