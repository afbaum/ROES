const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

//mongodb connection
// mongoose.connect('mongodb://admin:admin@ds237660.mlab.com:37660/#');
// const db = mongoose.connection;
//mongo error
// db.on('error', console.error.bind(console, 'connection error:'));

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.set('view engine', 'pug');

const routes = require('./routes');

app.use(routes);

app.use(express.static('public'));


app.listen(3000, () => {
  console.log('VA Audiology is running on localhost:3000')
});
