const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//mongodb connection
mongoose.connect('mongodb://admin:mic530gra@ds259085.mlab.com:59085/hearingaids');
const db = mongoose.connection;
//mongo error
db.on('error', console.error.bind(console, 'connection error:'));

const app = express();

// use sessions for tracking logins
app.use(session({
  secret: 'treehouse loves you',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.use (function(req, res, next) {
  res.locals.currentUser = req.session.userId;
  next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.set('view engine', 'pug');

const routes = require('./routes');

app.use(routes);

app.use(express.static('public'));


app.listen(3000, () => {
  console.log('VA Audiology is running on localhost:3000')
});
