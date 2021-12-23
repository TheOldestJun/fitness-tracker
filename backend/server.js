const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const exercisesRouter = require("./routes/exersices");
const usersRouter = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);
// server root check
/* app.get("/", (req, res) => {
  res.send("Hello world!");
}); */

const uri = process.env.DB_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () =>
  console.log("Connection to Database was established successfully")
);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
