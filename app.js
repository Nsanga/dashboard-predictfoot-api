require('dotenv').config();
const express = require('express');
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const dbConnect = require('./api/config/dbConnect');
const cors = require('cors');
const appRoutes = require("./api/routes/index");
const scheduleTask = require("./api/services/job/scheduleTask");
const fixtures = require("./api/services/fixture.service");
const bodyParser = require("body-parser");

// Connection to MongoDB
dbConnect();


// Get daily data from api-football
scheduleTask.scheduleTask("00 05 00 * * *", () => fixtures.getDailyFixtures(2));
scheduleTask.scheduleTask("00 05 01 * * *", () => fixtures.correctPreviousDayEvents());
scheduleTask.scheduleTask("00 05 02 * * *", () => fixtures.correctPreviousDayEvents());

// App initialization
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure CORS origin
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

// App Routes
app.use('/api/v1/', appRoutes());

// Custom 404 error handler
app.use((req, res, next) => {
  next(createError(404, 'Route not found'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message || 'Internal Server Error',
    },
  });
});

// Start the app
app.listen(process.env.PORT || 5000, () => {
  console.log("Server started");
});
