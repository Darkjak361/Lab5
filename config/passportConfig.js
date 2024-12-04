const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { users } = require('../routes/auth'); 

module.exports = function (passport) {
  passport.use(new LocalStrategy((username, password, done) => {
    const user = users.find(u => u.username === username);
    if (!user) {
      return done(null, false, { message: 'No user with that username' });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false, { message: 'Password incorrect' });
    }

    return done(null, user);
  }));

  passport.serializeUser((user, done) => done(null, user.username));
  passport.deserializeUser((username, done) => {
    const user = users.find(u => u.username === username);
    done(null, user);
  });
};
