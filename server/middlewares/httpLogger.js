const morgon = require("morgan");
const logger = require("../library/logger");

logger.stream = {
  write: (message) =>
    logger.info(message.substring(0, message.lastIndexOf("\n"))),
};

module.exports = morgon(
  ":method :url :status :response-time ms -:res[content-length]",
  { stream: logger.stream }
);
