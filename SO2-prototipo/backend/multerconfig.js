import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/'); // Path where files will be stored
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp + original extension
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
  