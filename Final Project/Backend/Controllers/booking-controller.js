const Booking = require("../models/booking-model");
const Property = require("../models/property-model");


// GET ALL BOOKINGS
const getAllBookings = async (req, res) => {
  try {

    const bookings = await Booking.find()
      .populate("guest", "name email")
      .populate("property");

    res.status(200).json({
      status: "success",
      count: bookings.length,
      data: bookings
    });

  } catch (error) {

    res.status(500).json({
      status: "fail",
      message: error.message
    });

  }
};


// GET MY BOOKINGS (GUEST)
const getMyBookings = async (req, res) => {
  try {

    const bookings = await Booking.find({
      guest: req.userId
    }).populate("property");

    res.status(200).json({
      status: "success",
      count: bookings.length,
      data: bookings
    });

  } catch (error) {

    res.status(500).json({
      status: "fail",
      message: error.message
    });

  }
};


// GET HOST BOOKINGS
const getHostBookings = async (req, res) => {
  try {
    const hostProperties = await Property.find({ host: req.userId }).select("_id");
    const propertyIds = hostProperties.map(p => p._id);

    const bookings = await Booking.find({
      property: { $in: propertyIds }
    }).populate("guest", "name email").populate("property");

    res.status(200).json({
      status: "success",
      count: bookings.length,
      data: bookings
    });

  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message
    });
  }
};


// GET ONE BOOKING
const getBookingById = async (req, res) => {
  try {

    const booking = await Booking.findById(req.params.id)
      .populate("guest", "name email")
      .populate("property");

    if (!booking) {
      return res.status(404).json({
        status: "fail",
        message: "Booking not found"
      });
    }

    res.status(200).json({
      status: "success",
      data: booking
    });

  } catch (error) {

    res.status(500).json({
      status: "fail",
      message: error.message
    });

  }
};


// CREATE BOOKING
const createBooking = async (req, res) => {
  try {

    const {
      property,
      checkIn,
      checkOut,
      guests
    } = req.body;


    // Find property
    const propertyData = await Property.findById(property);

    if (!propertyData) {
      return res.status(404).json({
        status: "fail",
        message: "Property not found"
      });
    }


    // Check if property is available
    if (!propertyData.isAvailable) {
      return res.status(400).json({
        status: "fail",
        message: "Property is not available"
      });
    }


    // Calculate number of days
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    const timeDifference =
      endDate - startDate;

    const numberOfDays =
      timeDifference / (1000 * 60 * 60 * 24);


    if (numberOfDays <= 0) {
      return res.status(400).json({
        status: "fail",
        message: "Check-out must be after check-in"
      });
    }


    // Check number of guests
    if (guests > propertyData.maxGuests) {
      return res.status(400).json({
        status: "fail",
        message: "Too many guests"
      });
    }


    // Calculate total price
    const totalPrice =
      propertyData.price * numberOfDays;


    // Create booking
    const booking = await Booking.create({
      guest: req.userId,
      property: property,
      checkIn: checkIn,
      checkOut: checkOut,
      guests: guests,
      totalPrice: totalPrice
    });


    res.status(201).json({
      status: "success",
      data: booking
    });

  } catch (error) {

    res.status(400).json({
      status: "fail",
      message: error.message
    });

  }
};


// UPDATE BOOKING STATUS
const updateBooking = async (req, res) => {
  try {

    const booking = await Booking.findById(
      req.params.id
    ).populate("property");


    if (!booking) {
      return res.status(404).json({
        status: "fail",
        message: "Booking not found"
      });
    }


    // Host of the property
    if (
      booking.property.host.toString() !==
      req.userId
    ) {
      return res.status(403).json({
        status: "fail",
        message: "You can only manage bookings for your properties"
      });
    }


    const updatedBooking =
      await Booking.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status
        },
        {
          returnDocument: "after",
          runValidators: true
        }
      );


    res.status(200).json({
      status: "success",
      data: updatedBooking
    });

  } catch (error) {

    res.status(400).json({
      status: "fail",
      message: error.message
    });

  }
};


// CANCEL MY BOOKING
const cancelBooking = async (req, res) => {
  try {

    const booking = await Booking.findById(
      req.params.id
    );

    if (!booking) {
      return res.status(404).json({
        status: "fail",
        message: "Booking not found"
      });
    }


    // Only the guest who made the booking
    // can cancel it
    if (
      booking.guest.toString() !==
      req.userId
    ) {
      return res.status(403).json({
        status: "fail",
        message: "You can only cancel your own booking"
      });
    }


    const updatedBooking =
      await Booking.findByIdAndUpdate(
        req.params.id,
        {
          status: "cancelled"
        },
        {
          returnDocument: "after"
        }
      );


    res.status(200).json({
      status: "success",
      data: updatedBooking
    });

  } catch (error) {

    res.status(500).json({
      status: "fail",
      message: error.message
    });

  }
};


module.exports = {
  getAllBookings,
  getMyBookings,
  getHostBookings,
  getBookingById,
  createBooking,
  updateBooking,
  cancelBooking
};