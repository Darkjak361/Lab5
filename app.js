const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const authRoutes = require('./routes/auth'); 
const initializePassport = require('./config/passportConfig');
const app = express();
const PORT = 3000;

initializePassport(passport);
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'views')));


app.use('/auth', authRoutes.router); 

app.get('/', (req, res) => {
  res.redirect('/auth'); 
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
