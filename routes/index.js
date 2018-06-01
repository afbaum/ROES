const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const mid = require('../middleware');

router.get('/', (req, res) => {
  res.render('index');
});

//GET .profile
router.get('/profile', mid.requiresLogin, (req, res, next) => {
  User.findById(req.session.userId)
  .exec(function (error, user) {
    if (error) {
      return next(error);
    } else {
      return res.render('profile', {title: 'Profile', name: user.name, email: user.email});
    }
  });
});

//GET /logout
router.get('/logout', (req, res, next) => {
  if (req.session) {
    //delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});
// GET /login
router.get('/login', mid.loggedOut, (req, res, next) => {
    return res.render('login', {title: 'Log In'});
});

router.post('/login', (req, res, next) => {
  if (req.body.email && req.body.password){
    User.authenticate(req.body.email, req.body.password, function(error, user){
      if (error || !user) {
        const err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/');
      }
    });
  } else {
    var err = new Error('Email and password are required.');
    err.status = 401;
    return next(err);
  }
});

// GET /register
router.get('/register', mid.loggedOut, (req, res, next) => {
    return res.render('register')
});

// POST /register
router.post('/register', (req, res, next) => {
  if (req.body.email &&
    req.body.name &&
    req.body.password &&
    req.body.confirmPassword) {

      // confirm that user typed same password twice
      if (req.body.password !== req.body.confirmPassword) {
        const err = new Error('Passwords do not match.');
        err.status = 400;
        return next(err);
      }
      // create object with form input
      const userData = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
      };

      // use schema's create method to insert document into mongo
      User.create(userData, function(error, user){
        if (error) {
          return next(error);
        } else {
          req.session.userId = user._id;
          return res.redirect('/');
        }
      });

    } else {
      const err = new Error('All fields required');
      err.status = 400;
      return next(err);
    }
});

router.get('/hearingaids', (req, res, next) => {
    return res.render('hearingaids')
});

router.get('/itemsearch', (req, res, next) => {
    return res.render('itemsearch')
});

router.post('/itemsearch', (req, res, next) => {
  console.dir(req.body);
  res.render('itemsearch');
});

module.exports = router;
