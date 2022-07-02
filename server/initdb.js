const mongoose = require("mongoose");
require("dotenv").config();
const logger = require("./library/logger");

const initdb = () => {
  mongoose.connect(process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  mongoose.connection.on("error", (error) => {
    logger.error(`Error Connection Reminder-App DB: ${error.message}`);
  });
  mongoose.connection.on("open", () => {
    logger.info(`Reminder-App DB Connection UP`);
  });
};

module.exports = { initdb };
