const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"]
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false
    },

    role: {
      type: String,
      enum: ["guest", "host", "admin"],
      default: "guest"
    },

    phone: {
      type: String,
      trim: true
    },

    avatar: {
      type: String,
      default: "default-user.webp"
    },

    identityDocument: {
      type: String
    },

    isVerified: {
      type: Boolean,
      default: false
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },

  {
    timestamps: true
  }
);


// Hash password before saving

userSchema.pre("save", async function () {

  if (this.isModified("password")) {

    this.password = await bcrypt.hash(
      this.password,
      10
    );

  }

});


const User = mongoose.model("User", userSchema);

module.exports = User;