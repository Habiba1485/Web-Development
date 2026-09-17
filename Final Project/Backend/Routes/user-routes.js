const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  getMyProfile,
  updateMyProfile,
  updateAvatar,
  uploadIdentityDocument
} = require("../Controllers/user-controller");

const {
  uploadAvatar,
  uploadVerification
} = require("../middlewares/multer-middleware");

const authenticateMiddleware =
  require("../middlewares/authenticate-middleware");

const authorizeMiddleware =
  require("../middlewares/authorize-middleware");


// ADMIN ONLY
router.get(
  "/",
  authenticateMiddleware,
  authorizeMiddleware("admin"),
  getAllUsers
);


// MY PROFILE
router.get(
  "/me",
  authenticateMiddleware,
  getMyProfile
);


// UPDATE MY PROFILE
router.patch(
  "/me",
  authenticateMiddleware,
  updateMyProfile
);


// UPDATE AVATAR
router.patch(
  "/avatar",
  authenticateMiddleware,
  uploadAvatar.single("avatar"),
  updateAvatar
);


// HOST IDENTITY DOCUMENT
router.post(
  "/identity",
  authenticateMiddleware,
  authorizeMiddleware("host"),
  uploadVerification.single("identityDocument"),
  uploadIdentityDocument
);


module.exports = router;