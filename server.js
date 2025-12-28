/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const accountController = require("./controllers/accountController")
const recipesRoute = require("./routes/recipesRoute")
const accountRoute = require("./routes/accountRoute")
const utilities = require("./utilities/")
const session = require("express-session")
const pool = require("./database/")
const cookieParser = require("cookie-parser")

/* ***********************
 * Middleware
*************************/
app.use(session({
  store: new (require('connect-pg-simple')(session)) ({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

/* ***********************
 * Express Messages Middleware
*************************/
app.use(require('connect-flash')())
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})
// app.use(utilities.checkJWTToken)

/* ***********************
 * Middleware to check login status
 *************************/
app.use((req, res, next) => {
  res.locals.loggedin = req.session.loggedin || false;
  res.locals.accountData = req.session.accountData || {};
  next();
})

/* ***********************
 * Routes
*************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

/* ***********************
 * Routes
*************************/
app.use(static)

// Index route
// app.get("/", utilities.handleErrors(baseController.buildHome))
app.get("/", utilities.handleErrors(accountController.buildLogin))

// Recipes routes
app.use("/recipes", recipesRoute)

// Account routes
app.use("/account", accountRoute)

// File Not Found Route - last route in list
app.use(async (req, res, next) => {
  next({
    status: 400,
    message: 'Sorry, we appear to have lost that page.'
  })
})

/* ***********************
 * Express Error Handler
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  let message
  if (err.status == 400) {
    message = err.message
  } else if (process.env.NODE_ENV === 'development') {
    message = err.message
  } else {
    message = 'Oh no! There was a crash. Maybe try a different route?'
  }
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  })
})

/* ***********************
 * Local Server Information
*************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
*************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})