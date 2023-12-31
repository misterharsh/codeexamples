require('./db/connection');
const express = require("express");
const app = express();
const version = "/v1";
const prefix = "/api" + version;

// routes
const taskRouter = require("./routes/tasks");

// middleware
app.use(express.json());
app.use(`${prefix}/tasks`, taskRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
