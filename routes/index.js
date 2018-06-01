const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/register', (req, res, next) => {
    return res.render('register')
});

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
