// Needed Resources
const express = require("express")
const router = new express.Router()
const recipesController = require("../controllers/recipesController")
const utilities = require("../utilities")
// const { isAuthenticated } = require('../utilities/authenticate');

// Route to get the submit recipe view
// router.use(isAuthenticated) // update to display a message like 'Please log in before submitting a recipe'
router.get("/submit", utilities.handleErrors(recipesController.buildSubmitRecipes));
 
module.exports = router