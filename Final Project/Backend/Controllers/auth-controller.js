const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const getJWT = require("../utils/get-jwt");


// SIGNUP
const signup = async (req, res) => {
  try {

    // Only guest or host can register
    let role = req.body.role || "guest";

    if (role !== "guest" && role !== "host") {
      return res.status(400).json({
        status: "fail",
        message: "Role must be guest or host"
      });
    }

    // Create user
    const user = await User.create({
      ...req.body,
      role: role,
      avatar: req.file?.filename || "default-user.webp"
    });

    // Create token
    const token = getJWT(user);

    res.status(201).json({
      status: "success",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar
        },
        token: token
      }
    });

  } catch (error) {

    res.status(400).json({
      status: "fail",
      message: error.message
    });

  }
};


// SIGNIN
const signin = async (req, res) => {
  try {

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email })
      .select("+password");

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password"
      });
    }

    // Check password
    const isPasswordCorrect =
      await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password"
      });
    }

    // Create token
    const token = getJWT(user);

    res.status(200).json({
      status: "success",
      token: token
    });

  } catch (error) {

    res.status(500).json({
      status: "fail",
      message: error.message
    });

  }
};


module.exports = {
  signup,
  signin
};