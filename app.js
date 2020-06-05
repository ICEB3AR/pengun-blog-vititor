var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var visitorsRouter = require('./routes/visitors');

//mongodb connection
var connect = require('./models');

connect();

var app = express();

const corsConfig = {
    origin: true,
    credentials: true,
};
app.use(cors(corsConfig));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/visitors', visitorsRouter);
module.exports = app;
