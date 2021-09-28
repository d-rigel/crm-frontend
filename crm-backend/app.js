const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const app = express();

//load config
// dotenv.config({ path: "./config/config.env" });

// require("dotenv").config({ path: "./config/config.env" });

//bring mongodb
const connectDB = require("./config/db");

connectDB();

//API security
app.use(helmet());

//handle CORS error
app.use(cors());

// //MongoDB Connection Setup
// const mongoose = require("mongoose");
// mongoose.connect(process.env.MONGO_URL);

// if (process.env.NODE_ENV !== "production") {
//   const conn = mongoose.connection;
//   conn.on("open", () => {
//     console.log("MongoDB is connected");
//   });

//   mongoose.on("error", (error) => {
//     console.log(error);
//   });
// }

//Logger
app.use(morgan("tiny"));

//Set body bodyParser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//load routes
const userRouter = require("./src/routers/user.router");
const ticketRouter = require("./src/routers/ticket.router");

//users Routers
app.use("/v1/user", userRouter);

//ticket Routers
app.use("/v1/ticket", ticketRouter);

//Error handler func
const handleError = require("./src/utils/errorHandler");

//Error handling
app.use((req, res, next) => {
  // console.log(hdhhh);
  const error = new Error("Resource is not found");
  error.status = 404;

  next(error);
});

app.use((error, req, res, next) => {
  handleError(error, res);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
