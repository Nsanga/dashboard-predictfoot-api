require('dotenv').config();
const express = require('express');
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const dbConnect = require('./api/config/dbConnect');
var cors = require('cors');
const appRoutes = require("./api/routes/index");

const bodyParser = require("body-parser");


// Connection to mongodb
 dbConnect();
// App initialization
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
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
app.use('/api/v1/', appRoutes() );

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
  });


// Start the app
app.listen(process.env.PORT || 5000, function() {
    console.log("Server started")
})