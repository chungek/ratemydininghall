var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var profileController = require('./controllers/profileController')

var indexRouter = require('./routes/index');
var reviewsRouter = require('./routes/reviews');
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');

var app = express();

// here is where we connect to the database!
const mongoose = require('mongoose');
mongoose.connect( 'mongodb://localhost/ratemydininghall' );
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected!")
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//middleware to process the req obj and make it more useful
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routing
app.use('/', indexRouter);
app.use('/reviews', reviewsRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);

//routing but using a controller
console.log('before my profiles code')
console.dir()
console.dir(profileController)
app.get('/profile', profileController.getAllProfiles);
app.post('/saveProfile', profileController.saveProfile );
app.post('/deleteProfile', profileController.deleteProfile );

app.use('/', function(req, res, next) {
  console.log("in / controller")
  res.render('index', { title: 'RateMyDiningHall' });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
