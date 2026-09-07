const express = require("express");
const cors = require("cors");
/*rudderz243, 2026*/
const corsOptions = {
  origin: "https://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
};

// this function will handle enabling all security middleware for our app
const setupSecurity = (app) => {
  app.use(cors(corsOptions));
};

module.exports = setupSecurity;
/*Reference List:
rudderz243. 2026. authController.(Version 1.0) [Source Code] Available at: <https://github.com/rudderz243/insy7314-library/blob/master/backend/controllers/authController.js> [Accessed 2 September 2026]. 

*/