//Const of module required
const express = require("express");
const UserController = require("../controllers/userController");
const {
  registerValidator,
  loginValidator,
  permissionsValidator,
} = require("../validators/userValidator");
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware')


router.post("/register", registerValidator, authenticateToken, UserController.register)
router.get("/infoUser", authenticateToken, UserController.infoUser)
router.get("/appsUser", authenticateToken, UserController.getAppsUser)
router.get("/getAllPermissions", authenticateToken, UserController.getAllPermissions)
router.post("/deletePermission", permissionsValidator, authenticateToken, UserController.deletePermissions)
router.post("/addPermission", permissionsValidator, authenticateToken, UserController.addPermissions)
router.post("/login", loginValidator, UserController.login)
router.get("/ping", UserController.test)

module.exports = router;
