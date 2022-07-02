const logger = require("../library/logger");
const apiResponse = require("../library/apiResponse");
const pingtest = async (_req, res) => {
  logger.info("Apartment Rental Ping Controller");
  res.status(200).json(apiResponse(false, "Ping Successful", ""));
};

module.exports = pingtest;
