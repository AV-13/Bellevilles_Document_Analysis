const express = require('express');
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage: storage });
const userController = require ("../controllers/userController");
const User = require ("../models/User");
const { isLoggedIn } = require ('../middleware/auth');
const authController = require ('../controllers/authController');

// Route to check in react if a user is logged in
router.get('/isUserLoggedIn', (req, res) => { 
  req.isAuthenticated() ? res.send({ isLoggedIn: true}) : res.send({ isLoggedIn: false })
});

router.get("/me", isLoggedIn, (req, res, next) => {
  User.findById(req.session.currentUser._id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});
router.post('/register', upload.single('avatar'), authController.register);

router.post('/login' , authController.login);

router.get('/logout', authController.logout);

router.post('/deleteprofile/:id', isLoggedIn, userController.deleteUser);
router.post('/updateprofile', upload.single("avatar"), isLoggedIn, userController.editUser);

router.get("/avatar/:id", async(req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.set("Content-Type", user.avatar.contentType);
    res.send(user.avatar.data);
  } catch(error) {
    console.error("Error on get/avatar/:id : ", error);
    res.status(400).send("Erreur lors de la récupération de l'avatar");
  }
});
module.exports = router;