const jwt = require("jsonwebtoken");
const shortid = require("shortid");
const logger = require("../library/logger");

const generateJwtToken = async (userData, cb) => {
  logger.info("Generate JWT Token:");
  try {
    let token = {
      jwtid: shortid.generate(),
      iat: Date.now(),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      sub: "authToken",
      iss: "Cookie-app",
      data: userData,
    };
    let generatedToken = {
      authToken: jwt.sign(token, process.env.TOKEN_SECRET),
    };
    cb(null, generatedToken);
  } catch (error) {
    logger.error(`Error Generating Token:${error.message}`);
    cb(error, null);
  }
};

module.exports = { generateJwtToken };
