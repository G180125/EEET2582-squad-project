//donorServer.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const helmet = require("helmet");
const donorRoutes = require("./donorRouter");
const { connectDB, initializeData } = require('../../config/db');

const app = express();
const PORT = 4000;

// CORS setup
const whilelistedCors = [
  'http://localhost:2582',
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

// Connect to the database and initialize data
connectDB()
  .then(() => initializeData())
  .catch(err => console.error('Error during initialization:', err));

app.use("/donors", donorRoutes);

app.listen(PORT, () => {
  console.log(`DonorServer running on port ${PORT}`);
});
