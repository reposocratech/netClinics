var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var patientRouter = require('./routes/patient');
var medicsRouter = require('./routes/medic');
var placeRouter = require('./routes/place');
var titleRouter = require('./routes/title');
var timeRouter = require('./routes/time');
var appointmentRouter = require('./routes/appointment');
var specialityRouter = require('./routes/speciality');



var app = express();

app.use(
  cors({
    origin: "*"
  })
)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/user', usersRouter);
app.use('/admin', adminRouter);
app.use('/patient', patientRouter);
app.use('/medic', medicsRouter);
app.use('/place', placeRouter);
app.use('/title', titleRouter);
app.use('/time', timeRouter);
app.use('/appointment', appointmentRouter);
app.use('/speciality', specialityRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

/*
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/

module.exports = app;
