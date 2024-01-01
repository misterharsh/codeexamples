require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const connectDB = require("./db/connect");

const productsRouter = require("./routes/products");

// async errors

// globals
const port = process.env.PORT || 3000;
const version = "/v1";
const prefix = "/api" + version;

// middleware
const NotFound = require("./middleware/not-found");
const APIError = require("./middleware/error-handler");
app.use(express.json());

// routes
app.use(`${prefix}/products`, productsRouter);

// final routes
app.use(NotFound);
app.use(APIError);

// server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
