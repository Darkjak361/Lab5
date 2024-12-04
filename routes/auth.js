const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const path = require('path');
const router = express.Router();
const users = [];

module.exports = { router, users }; 

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/home.html'));
});

router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/signup.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  users.push({ username, password: hashedPassword });
  res.redirect('/auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/auth/welcome',
  failureRedirect: '/auth/login',
}));

router.get('/welcome', (req, res) => {
  res.send('Welcome to CPAN212!');
});
