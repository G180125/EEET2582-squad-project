require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const helmet = require("helmet");
const httpStatus = require("http-status"); 
const { authRouter, charityRouter, donorRouter, projectRouter } = require("./routers");
const { connectDB, initializeData } = require('./config/dbConfig');

const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 3000;

// Connect to the database and initialize data
connectDB()
  .then(() => initializeData())
  .catch(err => console.error('Error during initialization:', err));

// CORS setup
const whilelistedCors = [
  `http://localhost:${SERVER_PORT}`,
  'http://localhost:5173',
];

// Middleware setup
app.use(helmet()); // Set security-related HTTP headers
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
app.use(cookieParser()); // Parse cookies
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

const API_PREFIX = '/charitan/api/v1';

// Basic test route
app.get(`${API_PREFIX}`, (req, res) => {
  return res.status(httpStatus.OK).json({ message: "Hello world! Server is running well" });
});

// Routes setup with prefix
app.use(`${API_PREFIX}/auth`, authRouter);
app.use(`${API_PREFIX}/charities`, charityRouter);
app.use(`${API_PREFIX}/donors`, donorRouter);
app.use(`${API_PREFIX}/projects`, projectRouter);

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
