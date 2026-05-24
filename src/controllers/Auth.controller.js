const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const { matchedData } = require('express-validator');
const passport = require('../config/passport');

function getSignUpPage(req, res) {
  res.render('sign-up-form', { title: 'Sign Up' });
}
async function createUser(req, res) {
  if (res.locals.validationErrors) {
    return res.status(400).render('sign-up-form', { title: 'Sign Up' });
  }
  const { username, password } = matchedData(req);
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [
    username,
    hashedPassword,
  ]);
  res.redirect('/login');
}

function getLoginPage(req, res) {
  const errorMessages = req.session?.messages ?? [];
  req.session.messages = []; // clear after reading
  res.render('login-form', { title: 'Login', authenticationError: errorMessages.at(-1) });
}

async function handleLogin(req, res, next) {
  if (res.locals.validationErrors) {
    return res.status(400).render('login-form', { title: 'Login' });
  }
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true,
  })(req, res, next);
}

function handleLogout(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  });
}
module.exports = { getSignUpPage, createUser, getLoginPage, handleLogin, handleLogout };
