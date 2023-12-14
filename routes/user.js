const express = require('express');
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage: storage });
const userController = require ("../controllers/userController");
const User = require ("../models/User");
const {isAuthentificated, isLoggedIn} = require ('../middleware/auth');
const authController = require ('../controllers/authController');


router.post('/register', upload.single('avatar'), authController.register);

router.post('/login', isLoggedIn, authController.login);

router.get('/logout', authController.logout);

router.post('/deleteprofile/:id', isLoggedIn, userController.deleteUser);
router.post('/updateprofile', upload.single("avatar"), isLoggedIn, userController.editUser);

router.get("/avatar/:id", async(req, res) => {
  try {
    console.log("Requête pour l'avatar reçue");
    const user = await User.findById(req.params.id);
    console.log("utilisateur trouvé : ", user);
    res.set("Content-Type", user.avatar.contentType);
    res.send(user.avatar.data);
  } catch(error) {
    console.error("Error on get/avatar/:id : ", error);
    res.status(400).send("Erreur lors de la récupération de l'avatar");
  }
});
// TODO Maybe do a error page
module.exports = router;