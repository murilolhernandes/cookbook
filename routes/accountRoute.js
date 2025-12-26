// Needed Resources
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
// const regValidate = require('../utilities/account-validation')

// Route to build the account view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Route to build account information through the register page
// router.get("/register", utilities.handleErrors(accountController.buildRegister));

// Route to post the registration
// router.post("/register",
//   regValidate.registrationRules(),
//   regValidate.checkRegData,
//   utilities.handleErrors(accountController.registerAccount));

// Route to post the login
// router.post("/login",
//   regValidate.loginRules(),
//   regValidate.checkLoginData,
//   utilities.handleErrors(accountController.accountLogin));

// Route to post the login
// router.post("/login/",

// )

// // Route to log the user out
// router.get("/logout", utilities.handleErrors(accountController.logout));

module.exports = router