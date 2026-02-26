// Needed Resources
const express = require("express")
const router = new express.Router()
const recipesController = require("../controllers/recipesController")
const utilities = require("../utilities")
const { isAuthenticated } = require('../utilities/authenticate');

router.use(isAuthenticated) // update to display a message like 'Please log in before submitting a recipe'

// Route to get the submit recipe view
router.get("/submit", utilities.handleErrors(recipesController.buildSubmitRecipes));

// Route to post the recipe
// router.post("/submit", utilities.handleErrors(recipesController.buildSubmitRecipesForm));
 
module.exports = router