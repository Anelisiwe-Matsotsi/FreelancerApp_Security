// mongoose is a library we use to handle connections to a MongoDB database
const mongoose = require("mongoose");
// dotenv allows us to call in sensitive information from a .env file, rather than hard-coding it (think appsettings.json)
require("dotenv").config();

// here we create a database object
const database = {
  // that includes a start method (that accepts 0 parameters)
  start: async () => {
    try {
      // here we get the connection string out of the .env file
      const connString = process.env.CONN_STRING;
      // tell mongoose to try and connect using it
      await mongoose.connect(connString);
      // if it connection succeeds, we print an appropriate message
      console.log("The database connection has connected");
    } catch (error) {
      // otherwise, if the connection fails (lets say they forgot their connection string, or there is a network error), we print an error out
      console.log("Cannot connect to database, " + error);
      // and exit the application (it makes no sense to continue running when the app relies on the database connection)
      process.exit(1);
    }
  },
};

// export all the methods to make them "public" (accessible in other files)
module.exports = database;
/*Reference List:

rudderz243. 2026. authController.(Version 1.0) [Source Code] Available at: <https://github.com/rudderz243/insy7314-library/blob/master/backend/controllers/authController.js> [Accessed 2 September 2026]. 

*/