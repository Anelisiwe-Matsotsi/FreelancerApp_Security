//(Rudman, 2026)
const fs = require("fs"); //to interact with folders and files on the PC
const path = require("path"); //determines the file paths

// declare a constant for where our logs will live
// this command gets the current directory name we are in, and adds /logs to it
const LOGS_DIR = path.join(__dirname, "..", "logs");

// we then check whether the folder already exists or not, creating it if it doesn't
if (!fs.existsSync(LOGS_DIR)) {
  fs.mkdirSync(LOGS_DIR, { recursive: true });
}

//(Petersen,2025)
// ANSII colours for logging / terminal output
const colours = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
};

//(StackOverflow, 2024)
// helper method to return the date in a clean format for the file names of the logs
const getDateString = () => {
  const now = new Date();
  const year = now.getFullYear(); //gets the year
  const month = String(now.getMonth() + 1).padStart(2, "0"); //gets month number
  const day = String(now.getDate()).padStart(2, "0"); //gets the day
  // return a combination of the date parts
  return `${year}-${month}-${day}`;
};

//(StackOverflow, 2024)
// helper method to generate the TIMESTAMPS for inside of the log file (when a log occured)
const getTimestamp = () => {
  const now = new Date();
  // use the helper we created to get the yyyy/mm/dd
  const date = getDateString();
  const hours = String(now.getHours()).padStart(2, "0");
  const mins = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${date} ${hours}:${mins}:${seconds}`;
};

//(Rudman, 2026)
// helper method to add to the end of the log file (rather than overwriting)
const appendToFile = (fileName, logEntry) => {
  // using the name of the file we want to write to, combine it with the name of the log folder
  const filePath = path.join(LOGS_DIR, fileName);
  fs.appendFile(filePath, logEntry, (err) => {
    // if we are not able to add to the log file -> print out to console
    if (err) {
      console.error(
        `[LOGGER ERROR] Failed to write to ${fileName}`,
        err.message,
      );
    }
  });
};

//(NestJS, 2026)
// function to generate the appopriate log message
// level = how dangerous it is; Message=whats get written in the log; context=where the log is from
const log = (level, message, context = "APP", meta = null) => {
  // get time and date from our helper methods
  const timestamp = getTimestamp();
  const dateStr = getDateString();

  let metaStr = ""; //any additional metadata
  // if there IS additional metadata from a 3rd party library then it is formatted properly
  if (meta) {
    // if the metadata is an instance of the "Error" class
    if (meta instanceof Error) {
      // extract its content
      metaStr = `\n${meta.stack || meta.message}`;
      // else if the metadata is in the format of a custom object
    } else if (typeof meta === object) {
      // try get its info
      try {
        metaStr = ` ${JSON.stringify(meta)}`;
      } catch (e) {
        metaStr = ` [Unextractable Error]`;
      }
      // if nothing matches -> just gooi the metadata into the string
    } else {
      metaStr = ` ${meta}`;
    }
  }

  // build the string that will go into the log file
  const fileEntry = `[${timestamp}] [${level}] [${context}]: ${message}${metaStr}\n`;

  // puts it into the file
  appendToFile(`${dateStr}-combined.log`, fileEntry);

  //(Rudman, 2026)
  // if the level was an error then add to a seperate file that does not contain general logs
  if (level === "ERROR") {
    appendToFile(`${dateStr}-error.log`, fileEntry);
  }

  //print any errors to the console so that we don't need to call console.log alongside the logger
  let colour = colours.reset; 
  //specify logger type (info, earn, error) to print it in appropriate color
  if (level === "INFO") colour = colours.green;
  if (level === "WARN") colour = colours.yellow;
  if (level === "ERROR") colour = colours.red;

  //(Dhandala, 2026)
  console.log(
    `${colours.gray}[${timestamp}]${colours.reset} ${colour}[${level}]${colours.reset} ${colours.cyan}
    [${context}]${colours.reset}: ${message}${metaStr}`,
  );
};

//specify logger type (info, earn, error) to print it in appropriate color
const logger = {
  info: (message, context = "APP", meta = null) =>
    log("INFO", message, context, meta),
  warn: (message, context = "APP", meta = null) =>
    log("WARN", message, context, meta),
  error: (message, context = "APP", meta = null) =>
    log("ERROR", message, context, meta),
};

module.exports = logger;

/*References
*
* Dhandala, N., 2026. How to implement custom logging framework in Node.js. (Version 1.0) [Source Code] Available at: < https://oneuptime.com/blog/post/2026-01-30-nodejs-custom-logging-framework/view > [Accessed 11 October 2026]
* NestJS, 2026. Logger. (Version 1.0) [Source Code] Available at: < https://docs.nestjs.com/application/logger > [Accessed 11 October 2026]
* Petersen, C., 2025. ANSI Escape Sequences. (Version 1.0) [Source Code] Available at: < https://gist.github.com/fnky/458719343aabd01cfb17a3a4f7296797 > [Accessed 11 October 2026]
* Rudman, G., 2026. insy7314-library. (Version 1.0) [Source Code] Available at: < https://github.com/rudderz243/insy7314-library > [Accessed 29 August 2026]
* StackOverflow, 2024. Assign javascript date to html5 datetime-local input. (Version 1.0) [Source Code] Available at: < https://stackoverflow.com/questions/28760254/assign-javascript-date-to-html5-datetime-local-input > [Accessed 11 October 2026]
* 
*/