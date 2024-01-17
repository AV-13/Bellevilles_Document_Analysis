const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

// router.delete('/delete/:filename', (req, res) => {
//   const filename = req.params.filename;
//   const filePath = path.join(__dirname, '..', 'public', filename);
//   if (fs.existsSync(filePath)) {
//     fs.unlink(filePath, (err) => {
//       if (err) {
//         return res.status(500).json({ message: 'Error deleting the file' });
//       }
//       res.status(200).json({ message: 'File deleted successfully' });
//     });
//   } else {
//     res.status(404).json({ message: 'File not found' });
//   }
// });

module.exports = router;
