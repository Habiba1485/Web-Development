const User = require("../models/user-model");


// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {

    const users = await User.find()
      .select("-password");

    res.status(200).json({
      status: "success",
      count: users.length,
      data: users
    });

  } catch (error) {

    res.status(500).json({
      status: "fail",
      message: error.message
    });

  }
};


// GET CURRENT USER
const getMyProfile = async (req, res) => {
  try {

    const user = await User.findById(req.userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found"
      });
    }

    res.status(200).json({
      status: "success",
      data: user
    });

  } catch (error) {

    res.status(500).json({
      status: "fail",
      message: error.message
    });

  }
};


// UPDATE CURRENT USER
const updateMyProfile = async (req, res) => {
  try {

    const user = await User.findByIdAndUpdate(
      req.userId,
      req.body,
      {
        returnDocument: "after",
        runValidators: true
      }
    ).select("-password");

    res.status(200).json({
      status: "success",
      data: user
    });

  } catch (error) {

    res.status(400).json({
      status: "fail",
      message: error.message
    });

  }
};


// UPDATE AVATAR
const updateAvatar = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        status: "fail",
        message: "Please upload an image"
      });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        avatar: req.file.filename
      },
      {
        returnDocument: "after"
      }
    ).select("-password");

    res.status(200).json({
      status: "success",
      data: user
    });

  } catch (error) {

    res.status(400).json({
      status: "fail",
      message: error.message
    });

  }
};


// UPLOAD IDENTITY DOCUMENT
const uploadIdentityDocument = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        status: "fail",
        message: "Please upload a document"
      });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        identityDocument: req.file.filename
      },
      {
        returnDocument: "after"
      }
    ).select("-password");

    res.status(200).json({
      status: "success",
      message: "Identity document uploaded successfully",
      data: user
    });

  } catch (error) {

    res.status(400).json({
      status: "fail",
      message: error.message
    });

  }
};


module.exports = {
  getAllUsers,
  getMyProfile,
  updateMyProfile,
  updateAvatar,
  uploadIdentityDocument
};