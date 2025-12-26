const utilities = require("../utilities/")
const accountController = {}

accountController.buildLogin = async function(req, res, next) {
  const nav = await utilities.getNav()
  res.render("account/login", {
    title: "Login", 
    nav,
    errors: null,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  })
}

module.exports = accountController