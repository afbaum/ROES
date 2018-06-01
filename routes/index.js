const express = require('express');
const router = express.Router();
// const User = require('../models/user');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/register', (req, res, next) => {
    return res.render('register')
});

router.post('/register', (req, res, next) => {
  res.render('register', {name: req.body.name});
});

router.get('/hearingaids', (req, res, next) => {
    return res.render('hearingaids')
});

router.get('/itemsearch', (req, res, next) => {
    return res.render('itemsearch')
});

router.post('/itemsearch', (req, res) => {
  console.dir(req.body);
  res.render('itemsearch');
});

module.exports = router;
