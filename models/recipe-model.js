const pool = require("../database/")

/* ***************************
 *  Get all category data
  * ************************** */
async function getCategories(){
  return await pool.query("SELECT * FROM public.categories ORDER BY category_name")
}

async function insertRecipe(recipe_name, category_id, description, user_id, instructions) {
  try {
    const data = await pool.query(
      "INSERT INTO public.recipes (recipe_name, category_id, description, user_id, instructions) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [recipe_name, category_id, description, user_id, instructions]);
      return data.rows[0];
  } catch (error) {
    console.error(`model ${error}`);
    throw new Error("Failed to insert recipe");
  }
}

async function insertImages(recipe_id, image_url, is_primary) {
  try {
    const data = await pool.query(
      "INSERT INTO public.recipe_images (recipe_id, image_url, is_primary) VALUES ($1, $2, $3) RETURNING *",
      [recipe_id, image_url, is_primary]);
      return data.rows[0];
  } catch (error) {
    console.error(`model ${error}`);
    throw new Error("Failed to insert images");
  }
}

module.exports = {getCategories, insertRecipe, insertImages};