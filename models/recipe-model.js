const pool = require("../database/")

/* ***************************
 *  Get all category data
  * ************************** */
async function getCategories(){
  return await pool.query("SELECT * FROM public.categories ORDER BY category_name")
}

module.exports = {getCategories};