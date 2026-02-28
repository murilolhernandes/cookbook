const pool = require("../database/")

/* ***************************
 *  Get all category data
  * ************************** */
async function getCategories(){
  return await pool.query("SELECT * FROM public.categories ORDER BY category_name")
}

async function insertRecipe(recipe_name, category_id, description, image_url, user_id, instructions) {
  try {
    const data = await pool.query(
      "INSERT INTO public.recipes (recipe_name, category_id, description, image_url, user_id, instructions) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [recipe_name, category_id, description, image_url, user_id, instructions])
      return data
  } catch (error) {
    console.error(`model ${error}`);
    throw new Error("Failed to insert recipe");
  }
}

module.exports = {getCategories, insertRecipe};