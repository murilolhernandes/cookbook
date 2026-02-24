const utilities = require("../utilities/")
const accountModel = require("../models/account-model")
const { createClient } = require('@supabase/supabase-js')
require("dotenv").config()

const accountController = {}

accountController.buildLogin = async function(req, res, next) {
  try {
    if (req.session.loggedin) {
      const nav = "false"
      const email = res.locals.accountData.email
      const accountData  = await accountModel.getUserByEmail(email)
      return res.render("account/management", {
        title: "Account View",
        nav,
        errors: null,
        username: accountData.username,
        email: accountData.email,
        user_id: accountData.user_id,
      })
    }
    // const nav = await utilities.getNav()
    const nav = "false"
    res.render("account/login", {
      title: "Login", 
      nav,
      errors: null,
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    })
  } catch (error) {
    next(error);
  }
}

/* ****************************************
* Process Google Login (Server-Side)
* *************************************** */
accountController.googleAuth = async function(req, res, next) {
  const { accessToken, email } = req.body

  try {

    // 1. Verify the token with Supabase
    // We re-initialize the client here to ensure we have access
    const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
    const { data: { user }, error } = await sb.auth.getUser(accessToken)

    // Security Check: Does the token match the email claim?
    if (error || !user || user.email !== email) {
      return res.status(401).json({ success: false, message: 'Invalid token' })
    }

    // 2. Get the user from my database (synced by the Trigger)
    // We might need to wait a split second if the trigger is slow,
    // but usually it's instant.
    const userData = await accountModel.getUserByEmail(email)

    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found in the DB '})
    }

    // 3. Set the Session
    req.session.loggedin = true
    req.session.accountData = userData

    // Send success back to the browser
    return res.json({ success: true })
  } catch (error) {
    next(error);
  }
}

accountController.buildAccount = async function(req, res, next) {
  try {
    // let nav = await utilities.getNav()
    let nav = "false"
    const email = res.locals.accountData.email
    const accountData  = await accountModel.getUserByEmail(email)
    res.render("account/management", {
      title: "Account View",
      nav,
      errors: null,
      username: accountData.username,
      email: accountData.email,
      user_id: accountData.user_id,
    })
  } catch (error) {
    next(error);
  }
}

accountController.logout = async function(req, res, next) {
  // Set a flash message to be displayed on the next page.
  req.flash("notice", "You have been successfully logged out.");

  // Clear the authentication state from the session, then keep the session until the user reloads the page
  // so the flash message can be delivered on the next request.
  req.session.loggedin = false;
  req.session.accountData = null;
  // delete req.session.loggedin
  // delete req.session.accountData

  req.session.save(err => {
    if (err) return next(err);
    res.redirect("/?logout=success");
  });
}

// accountController.isLoggedIn = async function(req, res, next) {
//   try {

//   }
// }

module.exports = accountController