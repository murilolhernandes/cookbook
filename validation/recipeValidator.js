const { body, validationResult } = require("express-validator");
const validate = {};
const recipeModel = require("../models/recipe-model");

/*  **********************************
  *  Registration Data Validation Rules
* ********************************* */
validate.recipesRules = () => {
  return [
    body("recipe_name")
      .trim()
      .notEmpty()
      .withMessage("Please provide a recipe name."),

    body("category_id")
      .trim()
      .notEmpty()
      .withMessage("Please choose a category from the dropdown list.")
      .isInt()
      .custom(async (category_id) => {
        const categoryExists = await recipeModel.checkExistingCategory(category_id)
        if (!categoryExists) {
          throw new Error("Category does not exist. Please choose a category from the dropdown list.")
        }
      }),

    // I'm thinking on making a custom function to check the size of the image before submitting it. But it would be difficult 
    // because the user might take a picture from their phone and the picture will be in high resolution.
    // body("iamge_url")

    body("description")
      .trim(),

    body("instructions")
      .trim()
      .notEmpty()
      .withMessage("Please provide the instructions for the preparation for this recipe."),
    
    // finish these ones later
    // body("rating")

    // body("prep_time")

    // body("cook_time")

    // body("additional_time")

    // body("total_time")

    // body("serving")

    // body("recipe_yield")

    // body("ingredient_name")

    // // Gotta find out how to do this when the id count can increase
    // body("amount")

    // body("unit")

    // body("notes")
  ]
}