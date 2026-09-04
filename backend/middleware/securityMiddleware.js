const express = require("express");
const cors = require("cors");

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
StackHawk.2026. NodeJS CORS Guide: What It Is and How to Enable It. [online] Available at: https://www.stackhawk.com/blog/nodejs-cors-guide-what-it-is-and-how-to-enable-it/ [Accessed 4 September 2026].
rudderz243. 2026. authController.(Version 1.0) [Source Code] Available at: <https://github.com/rudderz243/insy7314-library/blob/master/backend/controllers/authController.js> [Accessed 2 September 2026]. 

*/