const utilities = require("../utilities")
const recipeModel = require("../models/recipe-model")
const { createClient } = require('@supabase/supabase-js')
require("dotenv").config()

const recipesController = {}

recipesController.buildSubmitRecipes = async function (req, res, next) {
  const nav = await utilities.getNav()
  res.render("recipes/submit", {
    title: "Submit Your Recipe",
    nav,
    errors: null,
  })
}

module.exports = recipesController