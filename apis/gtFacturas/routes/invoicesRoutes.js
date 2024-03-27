//Const of module required
const express = require("express");
const InvoicesController = require("../controllers/invoicesController");
//const {  registerValidator,  loginValidator, } = require("../validators/invoicesValidator");
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware')


//router.post("/register", registerValidator, authenticateToken, UserController.register)
//router.get("/infoUser", authenticateToken, UserController.infoUser)
router.get("/getAssignUsers", authenticateToken, InvoicesController.getAssignUsers)
router.get("/getInvoices", authenticateToken, InvoicesController.getInvoices)
router.post("/uploadInvoices", authenticateToken, InvoicesController.uploadInvoices)


module.exports = router;
