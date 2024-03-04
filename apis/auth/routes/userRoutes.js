//Const of module required
const express = require("express");
const UserController = require("../controllers/userController");
const {
  registerValidator,
  loginValidator,
} = require("../validators/userValidator");
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware')


router.post("/register", registerValidator, authenticateToken, UserController.register)
router.post("/login", loginValidator, UserController.login)
router.get("/ping", UserController.test)

module.exports = router;
