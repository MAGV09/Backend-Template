const express = require('express');
const path = require('node:path');
const morgan = require('morgan');
const pool = require('./config/database');
const dotenv = require('dotenv');
// const session = require('express-session');
// const pgSession = require('connect-pg-simple')(session);
// const passport = require('./config/passport');

const errorHandler = require('./middleware/errorHandler');
const indexRouter = require('./routes/index');
// const authRouter = require('./routes/auth');

dotenv.config({ quiet: true });

// const sessionStore = new pgSession({
//   pool,
//   tableName: 'sessions',
//   createTableIfMissing: true,
// });

const app = express();
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
// app.use(
//   session({
//     store: sessionStore,
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
//   }),
// );
// app.use(passport.session());
// app.use((req, res, next) => {
//   res.locals.currentUser = req.user;
//   next();
// });

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
// app.use('/', authRouter);

//err handling
app.use(errorHandler);

const port = process.env.APP_PORT || 3000;
async function start() {
  try {
    await pool.query('SELECT 1');
    console.log('Connected to DB');
    app.listen(port, () => console.log(`Listening on ${port}`));
  } catch (err) {
    console.error('Failed to connect to DB:', err);
    process.exit(1);
  }
}

start();
