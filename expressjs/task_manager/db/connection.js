const mongoose = require("mongoose");
const connectionString =
  "mongodb+srv://modherahk:Password2024@learningdb.80ibsjm.mongodb.net/TASK-MANAGER?retryWrites=true&w=majority";

mongoose
  .connect(connectionString)
  .then(() => console.log("Connected to the DB..."))
  .catch((err) => console.log(err));