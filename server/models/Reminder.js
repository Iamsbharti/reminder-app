const mongoose = require("mongoose");
const Reminder = require("./Reminder");

let reminderSchema = mongoose.Schema({
  reminderId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  sendTime: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  createdOn: {
    type: String,
    required: true,
  },
  modifiedOn: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Reminder", reminderSchema);
