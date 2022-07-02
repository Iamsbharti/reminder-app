const joi = require("@hapi/joi");
const apiResponse = require("../library/apiResponse");
const logger = require("../library/logger");

let options = { abortEarly: false };

const registerUserValidation = async (req, res, next) => {
  logger.info("Register User Request Validation");
  let registerUserSchema = joi.object({
    name: joi.string().min(4).required(),
    email: joi.string().min(5).email().required(),
    mobile: joi.number().min(10).required(),
    password: joi.string().min(3).required(),
  });
  let { error } = registerUserSchema.validate(req.body, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(apiResponse(true, "InValid Input", errorMessage));
  }
  next();
};
const loginUserValidation = async (req, res, next) => {
  logger.info("Login User Request Validation");
  let loginUserSchema = joi.object({
    loginId: joi.string().min(4).required(),
    password: joi.string().min(5).required(),
  });
  let { error } = loginUserSchema.validate(req.body, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(apiResponse(true, "InValid Input", errorMessage));
  }
  next();
};
const addReminderValidation = async (req, res, next) => {
  logger.info("Add reminder  Validation");
  let addReminderSchema = joi.object({
    title: joi.string().min(4).required(),
    message: joi.string().min(4).required(),
    sendTime: joi.date().required(),
    userId: joi.string().min(2).required(),
  });
  let { error } = addReminderSchema.validate(req.body, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(apiResponse(true, "InValid Input", errorMessage));
  }
  next();
};
const updateReminderValidation = async (req, res, next) => {
  logger.info("Update reminder  Validation");
  let updateReminderSchema = joi.object({
    title: joi.string().min(4).required(),
    message: joi.string().min(4).required(),
    sendTime: joi.date().required(),
    userId: joi.string().min(2).required(),
    reminderId: joi.string().min(4).required(),
  });
  let { error } = updateReminderSchema.validate(req.body, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(apiResponse(true, "InValid Input", errorMessage));
  }
  next();
};

const getAllRemindersValidation = async (req, res, next) => {
  logger.info("Get all reminder  Validation");
  let updateReminderSchema = joi.object({
    userId: joi.string().min(2).required(),
  });
  let { error } = updateReminderSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(apiResponse(true, "InValid Input", errorMessage));
  }
  next();
};

const deleteARemindersValidation = async (req, res, next) => {
  logger.info("Delete A reminder  Validation");
  let updateReminderSchema = joi.object({
    reminderId: joi.string().min(2).required(),
  });
  let { error } = updateReminderSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(apiResponse(true, "InValid Input", errorMessage));
  }
  next();
};
module.exports = {
  registerUserValidation,
  loginUserValidation,
  addReminderValidation,
  updateReminderValidation,
  getAllRemindersValidation,
  deleteARemindersValidation,
};
