const express = require('express');
const { connectDB } = require('./config/database');
const session = require('express-session');
const uploadRoutes = require('./routes/uploadRoutes');
const quotationsRoutes = require('./routes/quotations');
const groupsRoutes = require('./routes/groups');
const MongoStore = require("connect-mongo");
const userRoutes = require('./routes/user');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy
const User = require('./models/User');
require("dotenv").config();
const cors = require('cors');


const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.v3uyutf.mongodb.net/?retryWrites=true&w=majority`;
const port = 3031;
const app = express();

// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true
// }));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

app.use(session({
  // TODO check secret what the fuck is this ?
  store: MongoStore.create({ mongoUrl: MONGO_URI}),
  secret: process.env.CLIENT_SECRET,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
  resave: true,
  saveUninitialized: true
}))
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
// Routes
app.use('/upload', uploadRoutes);

app.use('/quotations', quotationsRoutes);

app.use('/groups', groupsRoutes);

app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  connectDB();
  console.log(`Server listening at http://localhost:${port}`);
});
