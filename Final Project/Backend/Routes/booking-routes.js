const express = require("express");

const router = express.Router();

const {
  getAllBookings,
  getMyBookings,
  getHostBookings,
  getBookingById,
  createBooking,
  updateBooking,
  cancelBooking
} = require("../Controllers/booking-controller");

const authenticateMiddleware =
  require("../middlewares/authenticate-middleware");

const authorizeMiddleware =
  require("../middlewares/authorize-middleware");


// GUEST - GET MY BOOKINGS
router.get(
  "/my-bookings",
  authenticateMiddleware,
  authorizeMiddleware("guest"),
  getMyBookings
);


// HOST - GET HOST BOOKINGS
router.get(
  "/host-bookings",
  authenticateMiddleware,
  authorizeMiddleware("host"),
  getHostBookings
);


// CREATE BOOKING
router.post(
  "/",
  authenticateMiddleware,
  authorizeMiddleware("guest"),
  createBooking
);


// GET ONE BOOKING
router.get(
  "/:id",
  authenticateMiddleware,
  getBookingById
);


// HOST - ACCEPT / REJECT BOOKING
router.patch(
  "/:id",
  authenticateMiddleware,
  authorizeMiddleware("host"),
  updateBooking
);


// GUEST - CANCEL BOOKING
router.patch(
  "/:id/cancel",
  authenticateMiddleware,
  authorizeMiddleware("guest"),
  cancelBooking
);


module.exports = router;