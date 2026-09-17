const Review = require("../models/review-model");
const Booking = require("../models/booking-model");


// GET REVIEWS FOR A PROPERTY
const getPropertyReviews = async (req, res) => {
  try {

    const reviews = await Review.find({
      property: req.params.propertyId
    })
      .populate("guest", "name avatar");

    res.status(200).json({
      status: "success",
      count: reviews.length,
      data: reviews
    });

  } catch (error) {

    res.status(500).json({
      status: "fail",
      message: error.message
    });

  }
};


// CREATE REVIEW
const createReview = async (req, res) => {
  try {

    const {
      property,
      rating,
      comment
    } = req.body;


    // Check if guest has completed a booking
    const booking = await Booking.findOne({
      guest: req.userId,
      property: property,
      status: "completed"
    });


    if (!booking) {
      return res.status(400).json({
        status: "fail",
        message: "You can only review a property after completing your stay"
      });
    }


    // Check if user already reviewed this property
    const existingReview = await Review.findOne({
      guest: req.userId,
      property: property
    });


    if (existingReview) {
      return res.status(400).json({
        status: "fail",
        message: "You already reviewed this property"
      });
    }


    const review = await Review.create({
      guest: req.userId,
      property: property,
      rating: rating,
      comment: comment
    });


    res.status(201).json({
      status: "success",
      data: review
    });

  } catch (error) {

    res.status(400).json({
      status: "fail",
      message: error.message
    });

  }
};


// DELETE MY REVIEW
const deleteReview = async (req, res) => {
  try {

    const review = await Review.findById(
      req.params.id
    );


    if (!review) {
      return res.status(404).json({
        status: "fail",
        message: "Review not found"
      });
    }


    // Only the person who created the review
    // can delete it
    if (
      review.guest.toString() !==
      req.userId
    ) {
      return res.status(403).json({
        status: "fail",
        message: "You can only delete your own review"
      });
    }


    await Review.findByIdAndDelete(
      req.params.id
    );


    res.status(200).json({
      status: "success",
      message: "Review deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      status: "fail",
      message: error.message
    });

  }
};


module.exports = {
  getPropertyReviews,
  createReview,
  deleteReview
};