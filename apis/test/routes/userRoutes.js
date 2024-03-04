//Const of module required
const express = require("express");
const UserController = require("../controllers/userController");
const {
  registerValidator,
  loginValidator,
} = require("../validators/userValidator");
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware')


router.get("/ping2", UserController.test)

module.exports = router;
