const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const path = require("path");
const cors = require("cors");

const dbConnect = require("./config/db-connect");
require("dotenv").config();

const authRouter = require("./Routes/auth-routes");
const userRouter = require("./Routes/user-routes");
const propertyRouter = require("./Routes/property-routes");
const bookingRouter = require("./Routes/booking-routes");
const reviewRouter = require("./Routes/review-routes");


dbConnect();


const app = express();


app.use(cors({ origin: "http://localhost:4200"}));

app.use(express.json());


app.use( "/api/v1/uploads",express.static(path.join(__dirname, "uploads")));


app.use( "/api/v1/auth", authRouter);

app.use( "/api/v1/users", userRouter);

app.use("/api/v1/properties", propertyRouter);

app.use("/api/v1/bookings", bookingRouter);

app.use("/api/v1/reviews", reviewRouter);


app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});