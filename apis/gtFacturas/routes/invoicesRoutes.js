//Const of module required
const express = require("express");
const path = require("path");
const InvoicesController = require("../controllers/invoicesController");
//const {  registerValidator,  loginValidator, } = require("../validators/invoicesValidator");
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware')

uploadsPath = path.join(__dirname, "../uploads");
router.use(`/uploads`, express.static(uploadsPath));
//router.post("/register", registerValidator, authenticateToken, UserController.register)
//router.get("/infoUser", authenticateToken, UserController.infoUser)
router.get("/getAssignUsers", authenticateToken, InvoicesController.getAssignUsers)
router.get("/getInvoices", authenticateToken, InvoicesController.getInvoices)
router.get("/getInvoice", authenticateToken, InvoicesController.getInvoice)
router.post("/uploadInvoices", authenticateToken, InvoicesController.uploadInvoices)
router.post("/uploadImageInvoice", authenticateToken, InvoicesController.uploadImageInvoice)



module.exports = router;
