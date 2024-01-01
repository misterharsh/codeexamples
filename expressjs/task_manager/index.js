require("dotenv").config();
const express = require("express");
const app = express();
const { connectToDB } = require("./db/connection");
const NotFound = require("./middleware/notfound");

// globals
const port = 3000;
const version = "/v1";
const prefix = "/api" + version;

// routes
const taskRouter = require("./routes/tasks");

// middleware
app.use(express.json());
app.use(`${prefix}/tasks`, taskRouter);
app.use(NotFound);

const start = async () => {
  try {
    await connectToDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
