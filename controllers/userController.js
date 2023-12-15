const User = require('../models/User');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.editUser = async (req, res) => {
  try {
    console.log("Données du formulaire reçues", req.body);
    console.log("Fichier reçu", req.file);

    const { username, email, password } = req.body;
    const updateData = { username, email, password };

    if (req.file) {
      updateData.avatar = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    } else {
      console.error("Aucun fichier envoyé");
    }

    await User.findByIdAndUpdate(req.params.id, updateData);

    //  TODO REDIRECT IN  REACT
    } catch (error) {
      console.error("Erreur lors de la modification de l'utilisateur :", error);
      res.status(500).send("Erreur lors de la modification de l'utilisateur.");
    }
};

exports.deleteUser = async (req, res) => {
  console.log("userController.deleteUser");
  await User.findByIdAndDelete(req.params.id);
  // TODO REDIRECT IN REACT
}
