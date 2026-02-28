// Needed Resources
const express = require("express")
const router = new express.Router()
const recipesController = require("../controllers/recipesController")
const utilities = require("../utilities")
const { isAuthenticated } = require('../utilities/authenticate');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.use(isAuthenticated) // update to display a message like 'Please log in before submitting a recipe'

// Route to get the submit recipe view
router.get("/submit", utilities.handleErrors(recipesController.buildSubmitRecipes));

// Route to post the recipe
router.post("/submit", upload.single('image_url'), utilities.handleErrors(recipesController.submitRecipe));

// Route to get the recipe submitted via the form
router.get("/submitted", utilities.handleErrors(recipesController.buildRecipeSubmitted));
 
module.exports = router