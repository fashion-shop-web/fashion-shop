const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const signupRouter = require('./routes/signup');
const singleRouter = require('./routes/single');
const menRouter = require('./routes/men');
const kidRouter = require('./routes/kid');
const womenRouter = require('./routes/women');
const contactRouter = require('./routes/contact');
const loginRouter = require('./routes/login');
const checkoutRouter = require('./routes/checkout');
const customerRouter = require('./routes/customer');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/signup', signupRouter);
app.use('/single', singleRouter);
app.use('/men', menRouter);
app.use('/kid', kidRouter);
app.use('/women', womenRouter);
app.use('/contact', contactRouter);
app.use('/login', loginRouter);
app.use('/checkout', checkoutRouter);
app.use('/customer', customerRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
