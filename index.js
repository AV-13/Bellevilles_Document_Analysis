const express = require('express');
const { connectDB } = require('./config/database');
const session = require('express-session');
const uploadRoutes = require('./routes/uploadRoutes');
const quotationsRoutes = require('./routes/quotations');
const groupsRoutes = require('./routes/groups');
const userRoutes = require('./routes/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/User');

const cors = require('cors');


const port = 3031;
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  // TODO check secret what the fuck is this ?
  secret: "your_secret",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
