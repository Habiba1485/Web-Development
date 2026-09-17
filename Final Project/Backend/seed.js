const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "8.8.4.4"
]);


require("dotenv").config();

const mongoose = require("mongoose");

const User = require("./models/user-model");

const seedUsers = async () => {

  try {

    await mongoose.connect(
      process.env.MONGODB_URI,
      {
        dbName: process.env.DB_NAME
      }
    );

    console.log("Database Connected Successfully");


    // =========================
    // DEMO GUEST
    // =========================

    const guestExists = await User.findOne({
      email: "guest@staybook.com"
    });

    if (!guestExists) {

      await User.create({
        name: "Demo Guest",
        email: "guest@staybook.com",
        password: "Guest12345",
        role: "guest",
        phone: "01000000000"
      });

      console.log("Demo guest created");

    } else {

      console.log("Demo guest already exists");

    }


    // =========================
    // DEMO HOST
    // =========================

    const hostExists = await User.findOne({
      email: "host@staybook.com"
    });

    if (!hostExists) {

      await User.create({
        name: "Demo Host",
        email: "host@staybook.com",
        password: "Host12345",
        role: "host",
        phone: "01100000000"
      });

      console.log("Demo host created");

    } else {

      console.log("Demo host already exists");

    }


    await mongoose.connection.close();

    console.log("Seed completed");

  } catch (error) {

    console.log(
      `Seed Error: ${error.message}`
    );

    await mongoose.connection.close();

  }

};

seedUsers();