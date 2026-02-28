const utilities = require("../utilities")
const recipeModel = require("../models/recipe-model")
const accountModel = require("../models/account-model")
const { createClient } = require('@supabase/supabase-js')
require("dotenv").config()
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const recipesController = {}

recipesController.buildSubmitRecipes = async function (req, res, next) {
  try {
    let dropDownCategories = await utilities.getCategoryOptions()
    res.render("recipes/submit", {
      title: "Submit Your Recipe",
      errors: null,
      dropDownCategories,
    })
  } catch (error) {
    next(error);
  }
}

recipesController.submitRecipe = async function (req, res, next) {
  try {
    const { recipe_name, 
      category_id, 
      description, 
      // prep_time, 
      // cook_time, 
      // additional_time, 
      // total_time, 
      // serving, 
      // recipe_yield, 
      // amount, 
      // unit, 
      // ingredient_name, 
      // notes, 
      instructions } = req.body;
    const user_id = req.session.accountData.user_id;

    console.log(`Form data received for: ${recipe_name}`);

    const imageFile = req.file;
    let image_url = null;

    if (!imageFile) {
      req.flash("notice", "Please upload an image for your recipe.");
      return res.redirect("/recipes/submit");
    }

    const uniqueFileName = `${Date.now()}-${imageFile.originalname}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('recipe-images')
      .upload(uniqueFileName, imageFile.buffer, {
        contentType: imageFile.mimetype
      });

    if (uploadError) {
      console.error("Supabase Upload Error: ", uploadError);
      req.flash("notice", "Sorry, there was an error uploading your image.");
      return res.redirect("/recipes/submit");
    }

    const { data: urlData } = supabase.storage
      .from('recipe-images')
      .getPublicUrl(uniqueFileName);

    image_url = urlData.publicUrl;

    // console.log("Image successfully uploaded! URL: ", image_url);

    const insertResult = await recipeModel.insertRecipe (
      recipe_name,
      category_id,
      description,
      image_url,
      // prep_time,
      // cook_time,
      // additional_time,
      // total_time,
      // serving,
      // recipe_yield,
      // amount, 
      // unit, 
      // ingredient_name, 
      // notes,
      user_id,
      instructions,
    );

    if (insertResult) {
      req.flash("notice", `${recipe_name} was successfully submitted!`);
      res.redirect("/recipes/submitted")
    } else {
      req.flash("notice", "Sorry, your recipe submission failed.")
      res.status(501).render('/recipes/submit', {
        title: "Submit Your Recipe",
        dropDownCategories,
      });
    }
  } catch (error) {
    next(error);
  }
}

recipesController.buildRecipeSubmitted = async function (req, res, next) {
  try {
    res.render("recipes/submitted", {
      title: `Thank You For Submitting Your Recipe ${req.session.accountData.username.split(' ')[0]}`,
      errors: null,
      username: req.session.accountData.username,
      email: req.session.accountData.email,
      user_id: req.session.accountData.user_id,
    })
  } catch (error) {
    next(error);
  }
}

module.exports = recipesController