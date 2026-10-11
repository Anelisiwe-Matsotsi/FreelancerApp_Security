//(Rudman, 2026)
const express = require("express"); //declaring express for API and web server instance

//(Vallarasucse, 2026)
const https = require("https"); // for creating the https socket
const fs = require("fs"); // to read files from the filesystem

const database = require("./middleware/dbMiddleware.js"); //calls the DB middleware
const setupSecurity = require("./middleware/securityMiddleware.js"); //call the security malware that declares the cors origin
const logger = require("./utils/logger.js");
const httpLogger = require("./middleware/loggerMiddleware.js");

//(Rudman, 2026)
// calling all the routing files, allowing us to map them later in the file
const homeRoutes = require("./routes/homeRoutes.js"); //the HustleHub+ home page (to be designed in part 2)
const authRoutes = require("./routes/authRoutes.js"); //user login and register 
const gigRoutes = require("./routes/gigRoutes.js"); // CRUD for gigs
const bookingRoutes = require("./routes/bookingRoutes.js"); //client books gigs
const transactionRoutes = require("./routes/transactionRoutes.js"); //create transaction records & payments are simulated 

//(W3Schools, 2026)
// created a single instance of the express library for the API (singleton)
const app = express();

//(Vallarasucse, 2026)
// configure the SSL options
const sslOptions = {
  key: fs.readFileSync("../cert.key"), //identifies who owns the cert
  cert: fs.readFileSync("../cert.crt"), //used to encrypt the incoming traffic
  ca: fs.readFileSync("../ca.crt"), //who to ask if the cert is real
};

app.use(express.json()); // allows us to use json in requests and responses

app.use(httpLogger); //logs every HTTP request that passes through the backend

//(W3Schools, 2026)
//setupSecurity function goes through the declared singleton to apply the middleware security
setupSecurity(app);

//(GeeksforGeeks, 2025)
//mapped the routes to specific endpoints for the users to be able to go to the respective pages for logging in, booking, transactions or viewing gigs
app.use("/api/home", homeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/gig", gigRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/transaction", transactionRoutes);

//(StackOverflow, 2018b)
//add exception handling and custom logger to make node.js not exit on error
process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception: ${err.message}`, "CRASH", err); //gets added to the .log file and shown in console
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  logger.error(`Unhandled Rejection: ${reason}`, "CRASH"); //gets a rejection reason before it crashes the app
});

//log when the app is clised by user saying ctcl+c
process.on("SIGINT", () => {
  logger.info("Server shutting down (type ctrl+c in terminal)", "SERVER");
  process.exit(0);
});

//logs when the system was to close to close it without errors
process.on("SIGTERM", () => {
  logger.info("Server shutting down (termination signal received)", "SERVER");
  process.exit(0);
});

//(StackOverflow, 2018a)
//then function = handles asynchronous tasks allowing many callbacks
database.start().then(() => { //server starts by connecting to the mongo DB
  https.createServer(sslOptions, app).listen(3000, () => { //the applications starts listening on port 3000
    // once the app starts, we print out to the developer terminal
    console.log("API started on port 3000");
  });
});

/*
References

GeeksforGeeks, 2025. Routing in Express.js. (Version 1.0) [Source Code] Available at: < https://www.geeksforgeeks.org/node-js/what-is-routing-in-express/ > [Accessed 2 September 2026]
Rudman, G., 2026. insy7314-library. (Version 1.0) [Source Code] Available at: < https://github.com/rudderz243/insy7314-library > [Accessed 29 August 2026]
StackOverflow, 2018a. Socket.io connects but never listens to any events when HTTPS. (Version 1.0) [Source Code] Available at: < https://stackoverflow.com/questions/49600670/socket-io-connects-but-never-listens-to-any-event-when-https > [Accessed 2 September 2026]
StackOverflow, 2018b. Make node.js not exist on error. (Version 1.0) [Source Code] Available at: < https://stackoverflow.com/questions/4213351/make-node-js-not-exit-on-error > [Accessed 11 October 2026]
W3Schools, 2026. Node.js HTTPS Module (Version 1.0) [Source Code] Available at: < https://www.w3schools.com/nodejs/nodejs_https.asp > [Accessed 29 August 2026]
Vallarasucse, 2026. How to configure a domain SSL Certificate in Node.js. (Version 1.0) [Source Code] Available at: < https://medium.com/@vallarasucse200118/how-to-configure-a-domain-ssl-certificate-in-node-js-77cae14d157a > [Accessed 2 September 2026]

*/