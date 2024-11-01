//projectServer.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const projectRoutes = require("./projectRouter");
const { connectDB, initializeData } = require('../../config/db');

const app = express();
const PORT = 4001;

app.use(helmet());
app.use(cors());
app.use(express.json());

connectDB();

app.use("/projects", projectRoutes);

app.listen(PORT, () => {
  console.log(`ProjectService running on port ${PORT}`);
});
