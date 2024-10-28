const AccessToken= require('../models/accessToken'); 

// Store the access token
const storeAccessToken = async (accessToken) => {
  try {
    const tokenEntry = new AccessToken({
      accessToken: accessToken
    });
    await tokenEntry.save();
  } catch (err) {
    console.error("Error storing access token:", err);
    throw err;
  }
};

// Check if a user has an access token
const hasAccessToken = async (accessToken) => {
    try {
      const valid = await AccessToken.findOne({ accessToken: accessToken });
      return !!valid; 
    } catch (err) {
      console.error("Error checking access token:", err);
      throw err;
    }
  };

// Delete an access token
const deleteAccessToken = async (accessToken) => {
    try {
        //return 0: not found; return 1: delete successfully
      return await AccessToken.deleteOne({ accessToken: accessToken });
    } catch (err) {
      throw err;
    }
  };
  
module.exports = {
    storeAccessToken,
    hasAccessToken,
    deleteAccessToken,
};
