const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const route = require('./routes');
const passport = require('./utils/passport');

const app = express();

//helper
const hbs = require('hbs');
hbs.registerHelper('compare', function (a, b) {
  return a == b ? true : false;
});

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('express-session')({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
})

app.use(express.static(path.join(__dirname, 'public')));


//route init
route(app);

module.exports = app;
