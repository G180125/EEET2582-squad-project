require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const helmet = require("helmet");
const httpStatus = require("http-status");
const { authRouter, charityRouter } = require("./routers");
const { connectDB, initializeData } = require('./config/db');
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 3000;

// Connect to the database and initialize data
connectDB()
  .then(() => initializeData())
  .catch(err => console.error('Error during initialization:', err));

// CORS setup
const whilelistedCors = [
  `http://localhost:${SERVER_PORT}`,
  'http://localhost:4000'
];

app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    if (whilelistedCors.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const API_PREFIX = '/charitan/api/v1';


app.use(`${API_PREFIX}/auth`, authRouter);
app.use(`${API_PREFIX}/charities`, charityRouter);


// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err); 
  return res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    error: err.message,
  });
};

// Global error handler
app.use(errorHandler);

// Start the server
app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});
