
const isAuthenticated = (req, res, next) => {
  try {
    if (req.session.loggedin) {
      next();
    }
    else {
      req.flash("notice", "Please log in.")
      return res.redirect("/account/login")
    }
  } catch (error) {
    next (error);
  }
}

// const checkLoginType = (req, res, next) => {
//   let 
// }

module.exports = {
  isAuthenticated,
  // checkLoginType
}