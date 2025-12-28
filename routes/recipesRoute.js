// Needed Resources
const express = require("express")
const router = new express.Router()
const recipesController = require("../controllers/recipesController")
const utilities = require("../utilities")

// Route to get the submit recipe view
router.get("/submit", utilities.handleErrors(recipesController.buildSubmitRecipes));
 
module.exports = router