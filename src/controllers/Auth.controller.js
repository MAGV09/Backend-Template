const prisma = require('../lib/prisma');
const bcrypt = require('bcryptjs');
const { matchedData } = require('express-validator');
const passport = require('../config/passport');

async function createUser(req, res) {
  const { username, password, email } = matchedData(req);
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      email,
    },
  });
  res.json({ message: 'Account created successfully' });
}

async function handleLogin(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ message: info?.message ?? 'Invalid credentials' });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.status(200).json({
        message: 'Logged in successfully',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    });
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
      res.status(200).json({ message: 'Logged out successfully' });
    });
  });
}
module.exports = { createUser, handleLogin, handleLogout };
