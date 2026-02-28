const recpModel = require("../models/recipe-model.js")
const accModel = require("../models/account-model")
require("dotenv").config()
const { createClient } = require('@supabase/supabase-js')
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
const Util = {}

/* ************************
  * Constructs the nav HTML unordered list
  ************************ */
Util.getNav = async function(req, res, next) {
  let data = await recpModel.getCategories()
  let list = '<ul class="nav-ul">'
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/recipe/type/' +
      row.category_id +
      '" title="See our recipes of ' +
      row.category_name  +
      ' recipes">' +
      row.category_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

Util.getCategoryOptions = async function(category_id) {
  try {
    let data = await recpModel.getCategories()
    let options = '<option value="" disabled selected>Select a category</option>'
    data.rows.forEach((row) => {
      options += `<option value="${row.category_id}"`
      if (category_id != null && row.category_id == category_id) {
        options += " selected"
      }
      options += `>${row.category_name}</option>`
    })
    return options
  } catch (error) {
    return console.error(error);
  }
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
**************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util