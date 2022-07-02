const { createLogger, transports, format } = require("winston");
const dotenv = require("dotenv");
dotenv.config();

// config for tests mode
const testOptions = {
  level: "emerg",
  silent: "true",
};

const logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.splat(),
    format.timestamp({ format: "YYYY-MM-DD HH:MM:ss" }),
    format.printf((info) => `${info.timestamp} ${info.level} ${info.message}`)
  ),
  // save logs to local folder
  transports: [
    new transports.File({
      filename: "./logs/cookie-server.logs",
      json: false,
      maxsize: 5242880,
      maxFiles: 5,
    }),
    // supress loggers for test env.
    new transports.Console(process.env.NODE_ENV === "TEST" ? testOptions : {}),
  ],
});
module.exports = logger;
