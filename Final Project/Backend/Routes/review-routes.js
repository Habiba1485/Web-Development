const express = require("express");

const router = express.Router();

const {
  getPropertyReviews,
  createReview,
  deleteReview
} = require("../Controllers/review-controller");

const authenticateMiddleware =
  require("../middlewares/authenticate-middleware");

const authorizeMiddleware =
  require("../middlewares/authorize-middleware");


// GET REVIEWS FOR PROPERTY
// Anyone can see reviews
router.get(
  "/property/:propertyId",
  getPropertyReviews
);


// CREATE REVIEW
// Only guests can create reviews
router.post(
  "/",
  authenticateMiddleware,
  authorizeMiddleware("guest"),
  createReview
);


// DELETE REVIEW
// Guest can delete their own review
router.delete(
  "/:id",
  authenticateMiddleware,
  authorizeMiddleware("guest"),
  deleteReview
);


module.exports = router;