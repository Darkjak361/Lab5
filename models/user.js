const bcrypt = require('bcryptjs');

const users = []; 

function createUser(username, password) {
  const newUser = { username, password };
  users.push(newUser);
  return newUser;
}

function findUserByUsername(username) {
  return users.find(user => user.username === username);
}

function validatePassword(user, password, callback) {
  bcrypt.compare(password, user.password, callback);
}

module.exports = { createUser, findUserByUsername, validatePassword };
