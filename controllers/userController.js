const User = require('../models/User');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.editUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const updateData = { username, email, password };

    if (req.file) {
      updateData.avatar = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    }

    await User.findByIdAndUpdate(req.params.id, updateData);

    } catch (error) {
      console.error("Erreur lors de la modification de l'utilisateur :", error);
      res.status(500).send("Erreur lors de la modification de l'utilisateur.");
    }
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
}
