const passport = require('passport');
const User = require('../models/User');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const authController = {};

authController.register = (req, res) => {
  console.log("Register start ...");
  User.register(new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    avatar: {
      data: req.file.buffer,
      contentType: req.file.mimetype
    }
    // TODO enctype 
  }),
  // TODO check weird user in function below
  req.body.password, (err, user) => {
    if(err) {
      console.error("Erreur lors de l'enregistrement:", err);
    }
    console.log("Utilisateur enregistré, tentative d'authentification");
    passport.authenticate("local")(req, res, () => {
      console.log("Utilisateur authentifié");
    });
  });
};
// TODO CHECK REDIRECTION IN REACT
authController.login = passport.authenticate('local', {
  // successRedirect: TODO
  // successFailure: TODO

});

authController.logout = (req, res) => {
  try {
    res.clearCookie('connect.sid');
    // TODO redirect with React
  } catch(error) {
    console.error("authController.logout : ", error);
  }
}
module.exports = authController;