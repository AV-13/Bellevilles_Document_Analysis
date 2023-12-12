const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'public'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.array('file'), (req, res) => {
  const filePaths = req.files.map(file => file.path);
  res.status(200).json({ message: 'Files uploaded successfully', files: filePaths  });
});


module.exports = router;
