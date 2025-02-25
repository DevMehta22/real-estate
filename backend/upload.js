const multer = require('multer');
const path = require('path');

// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, 'uploads'); // Use absolute path
        cb(null, uploadPath);
      },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });

// Initialize Multer
const upload = multer({
  storage: storage,
  fileFilter: (res, file, cb) => {
    checkFileType(file, cb);
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
})

checkFileType = (file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      return cb("Error:This type of files is not allowed");
    }
  };
  
  module.exports = { upload };