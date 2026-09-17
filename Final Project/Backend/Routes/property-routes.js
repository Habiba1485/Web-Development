const express = require("express");

const router = express.Router();

const {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  uploadPropertyVerification
} = require("../Controllers/property-controller");

const {
  uploadPropertyImages,
  uploadVerification
} = require("../middlewares/multer-middleware");

const authenticateMiddleware =
  require("../middlewares/authenticate-middleware");

const authorizeMiddleware =
  require("../middlewares/authorize-middleware");


// GET ALL
// Anyone can view properties
router.get(
  "/",
  getAllProperties
);


// CREATE
// Only logged-in hosts
router.post(
  "/",
  authenticateMiddleware,
  authorizeMiddleware("host"),
  uploadPropertyImages.array("images", 5),
  createProperty
);


// GET ONE
// Anyone can view a property
router.get(
  "/:id",
  getPropertyById
);


// UPDATE
// Only logged-in hosts
router.patch(
  "/:id",
  authenticateMiddleware,
  authorizeMiddleware("host"),
  uploadPropertyImages.array("images", 5),
  updateProperty
);


// UPLOAD PROPERTY VERIFICATION
// Only logged-in hosts for their own property
router.post(
  "/:id/verification",
  authenticateMiddleware,
  authorizeMiddleware("host"),
  uploadVerification.array("documents", 3),
  uploadPropertyVerification
);


// DELETE
// Only logged-in hosts
router.delete(
  "/:id",
  authenticateMiddleware,
  authorizeMiddleware("host"),
  deleteProperty
);


module.exports = router;