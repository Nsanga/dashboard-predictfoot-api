require("dotenv").config();
const dotenv = require("dotenv");
const express = require("express");
const cors = require('cors');
const {dbConnect} = require("./config/dbConnect");

const bodyParser = require("body-parser");


// Routes

const Routes = require("./api/routes");

// Connection to mariadb
  initDb();
 

// App initialization
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//configuration cors origin
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Type, Accept, Content-Type, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

/* App Routes */
app.get("/refresh", (req, res) => {
  res.status(204).send("refresh server");
});

app.use("/api/", Routes);


// Start the app
app.listen(process.env.PORT || 5000, function () {
  console.log("Server started");
});

// export app
module.exports = app;
