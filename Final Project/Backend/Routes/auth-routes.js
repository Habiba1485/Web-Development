const express = require("express");

const router = express.Router();

const authControllers =
  require("../Controllers/auth-controller");

const {
  uploadAvatar
} = require("../middlewares/multer-middleware");


router.post(
  "/signup",
  uploadAvatar.single("avatar"),
  authControllers.signup
);


router.post(
  "/signin",
  authControllers.signin
);


module.exports = router;