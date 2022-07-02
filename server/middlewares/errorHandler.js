const apiResponse = require("../library/apiResponse");
const logger = require("../library/logger");

exports.logIpMiddleware = async (req, _res, next) => {
  let path = req.originalUrl;
  let method = req.method;
  let ip = req.ip;
  let protocol = req.protocol;
  logger.info(
    `${method} requested by - ${ip} for path- ${path} using ${protocol}`
  );
  next();
};

exports.pathNotFound = (req, res, next) => {
  res.status(404).json(apiResponse(true, "Requested Path Not Found", req.path));
  next();
};

exports.handleServerError = (error, _req, res, next) => {
  res.status(500).json(apiResponse(true, "Internal Server Error", error));
  next();
};
