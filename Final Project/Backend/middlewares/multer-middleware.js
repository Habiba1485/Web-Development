const multer = require("multer");
const path = require("path");


// =========================
// USER AVATAR
// =========================

const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/users");
  },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);

    cb(null, Date.now() + ext);
  }
});


const imageFilter = function (req, file, cb) {

  const allowedTypes = /jpg|jpeg|png|webp/;

  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG and WEBP images are allowed"));
  }
};


const uploadAvatar = multer({
  storage: userStorage,

  fileFilter: imageFilter,

  limits: {
    fileSize: 2 * 1024 * 1024
  }
});


// =========================
// PROPERTY IMAGES
// =========================

const propertyStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/properties");
  },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);

    cb(null, Date.now() + ext);
  }
});


const uploadPropertyImages = multer({
  storage: propertyStorage,

  fileFilter: imageFilter,

  limits: {
    fileSize: 5 * 1024 * 1024
  }
});


// =========================
// IDENTITY VERIFICATION
// =========================

const verificationStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/verification");
  },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);

    cb(null, Date.now() + ext);
  }
});


const verificationFilter = function (req, file, cb) {

  const allowedTypes = /jpg|jpeg|png|pdf/;

  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG and PDF files are allowed"));
  }
};


const uploadVerification = multer({
  storage: verificationStorage,

  fileFilter: verificationFilter,

  limits: {
    fileSize: 10 * 1024 * 1024
  }
});


module.exports = {
  uploadAvatar,
  uploadPropertyImages,
  uploadVerification
};