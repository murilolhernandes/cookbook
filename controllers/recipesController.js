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

    const insertResult = await recipeModel.insertRecipe (
      recipe_name,
      category_id,
      description,
      // image_url,
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
      const new_recipe_id = insertResult.recipe_id;
      const imageFiles = req.files;

      if (imageFiles && imageFiles.length > 0) {
        await recipesController.insertImages(imageFiles, new_recipe_id);
      }

      req.flash("notice", `${recipe_name} was successfully submitted!`);
      res.redirect("/recipes/submitted")
    } else {
      let dropDownCategories = await utilities.getCategoryOptions()
      req.flash("notice", "Sorry, your recipe submission failed.")
      res.status(501).render('recipes/submit', {
        title: "Submit Your Recipe",
        dropDownCategories,
      });
    }
  } catch (error) {
    next(error);
  }
}

recipesController.insertImages = async function (imageFiles, recipe_id) {
  try {
    if (imageFiles && imageFiles.length > 0) {
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const uniqueFileName = `${Date.now()}-${file.originalname}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
        .from('recipe-images')
        .upload(uniqueFileName, file.buffer, {
          contentType: file.mimetype
        });

        if (!uploadError) {
          const { data: urlData } = supabase.storage
            .from('recipe-images')
            .getPublicUrl(uniqueFileName);
          
          const image_url = urlData.publicUrl;

          const is_primary = (i === 0);

          await recipeModel.insertImages(recipe_id, image_url, is_primary);
        } else {
          console.error("Error uploading one of the images: ", uploadError);
        }
      }
    }
  } catch (error) {
    console.error("Error in insertImages: ", error);
    throw error;
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