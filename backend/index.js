require("dotenv").config();
const express = require('express');
const expressApp = require('./express-app');
const { connectDB, initializeData } = require('./config/db');

const StartServer = async() => {
    const SERVER_PORT = process.env.SERVER_PORT || 3000;
    const app = express();
    
    connectDB()
    .then(() => initializeData())
    .catch(err => console.error('Error during initialization:', err));

    
    await expressApp(app);

    app.listen(SERVER_PORT, () => {
        console.log(`listening to port ${SERVER_PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();