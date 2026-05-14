const winston = require("winston");

// Set up winston to log to both the console and a file called requests.log
const logger = winston.createLogger({
   level: "info",
   format: winston.format.combine(
       winston.format.timestamp(),         // adds a timestamp to every log
       winston.format.printf(({ timestamp, level, message }) => {
           return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
       })
   ),
   transports: [
       new winston.transports.Console(),                              // print to terminal
       new winston.transports.File({ filename: "requests.log" }),    // save to file
   ],
});


// This is the middleware function that logs each incoming request
function logRequest(req, res, next) {
   const userId = req.user ? req.user.id : "guest";


   logger.info(`${req.method} ${req.originalUrl} | user: ${userId}`);


   next();
}


module.exports = { logger, logRequest };



