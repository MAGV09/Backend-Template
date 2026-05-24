const express = require('express');
const morgan = require('morgan');
const prisma = require('./lib/prisma');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const passport = require('./config/passport');

const errorHandler = require('./middleware/errorHandler');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

dotenv.config({ quiet: true });

const sessionStore = new PrismaSessionStore(prisma, {
  checkPeriod: 12 * 60 * 60 * 1000, 
  dbRecordIdIsSessionId: true,
  dbRecordIdFunction: undefined,
});

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(morgan('dev'));
app.use(
  session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.session());

app.use('/', indexRouter);
app.use('/auth', authRouter);

//err handling
app.use(errorHandler);

const port = process.env.APP_PORT || 3000;
async function start() {
  try {
    await prisma.$connect();
    console.log('Connected to DB');
    app.listen(port, () => console.log(`Listening on ${port}`));
  } catch (err) {
    console.error('Failed to connect to DB:', err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

start();
