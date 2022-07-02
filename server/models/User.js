const mongoose = require("mongoose");
const Reminder = require("./Reminder");
let userSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  reminderCreated: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reminder",
    },
  ],
});
module.exports = mongoose.model("User", userSchema);
