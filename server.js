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
app.use(static)
app.use(session({
  store: new (require('connect-pg-simple')(session)) ({
    createTableIfMissing: false,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  name: 'sessionId',
  rolling: true,
  cookie: {
    maxAge: 5 * 60 * 60 * 1000, 
  },
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

/* ***********************
 * Express Messages Middleware
*************************/
// app.use(require('connect-flash')())
// Custom flash middleware to avoid [DEP0044] util.isArray warning from connect-flash
app.use(function(req, res, next) {
  req.flash = function(type, msg) {
    if (req.session === undefined) throw Error('req.flash() requires sessions');
    let msgs = req.session.flash = req.session.flash || {};
    if (type && msg) {
      // Write message
      if (Array.isArray(msg)) {
        msg.forEach(val => {
          (msgs[type] = msgs[type] || []).push(val);
        });
        return msgs[type].length;
      }
      return (msgs[type] = msgs[type] || []).push(msg);
    } else if (type) {
      // Read specific type
      let arr = msgs[type];
      delete msgs[type];
      return arr || [];
    } else {
      // Read all
      let allMsgs = { ...msgs };
      req.session.flash = {};
      return allMsgs;
    }
  }
  next();
})
app.use(function(req, res, next){
  // res.locals.messages = require('express-messages')(req, res)
  // Custom implementation to avoid [DEP0044] util.isArray warning from express-messages
  res.locals.messages = function() {
    const messages = req.flash()
    const types = Object.keys(messages)
    if (types.length === 0) return ''
    let buf = '<div id="messages">'
    types.forEach(type => {
      buf += `<ul class="${type}">`
      messages[type].forEach(msg => {
        buf += `<li>${msg}</li>`
      })
      buf += '</ul>'
    })
    buf += '</div>'
    return buf
  }
  next()
})

// Middleware to discard empty sessions before saving
app.use((req, res, next) => {
  const originalEnd = res.end;
  res.end = function (...args) {
    if (req.session) {
      if (req.session.flash && Object.keys(req.session.flash).length === 0) {
        delete req.session.flash;
      }
      if (!req.session.loggedin && !req.session.flash) {
        req.session.destroy(err => {
          if (err) console.error("Error destroying session:", err);
        });
        return originalEnd.apply(this, args);
      }
    }
    return originalEnd.apply(this, args);
  };
  next();
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
  // let nav = await utilities.getNav()
  let nav = "false"
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  console.error(err)
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