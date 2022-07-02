const router = require("express").Router();
const pingTest = require("../controller/pingController");
const { registerUserControl } = require("../controller/registerUserController");
const validations = require("../middlewares/requestValidation");
const { loginUserControl } = require("../controller/loginUserController");
const {
  addReminder,
  getAllReminders,
  deleteAReminder,
  udpateAReminder,
} = require("../controller/reminderController");
// ping
router.get("/ping", pingTest);

// register user route
router.post(
  "/register",
  validations.registerUserValidation,
  registerUserControl
);

// login user route
router.post("/login", validations.loginUserValidation, loginUserControl);

// add reminder route
router.post("/add", validations.addReminderValidation, addReminder);

//get all reminders by userid
router.get("/get/id", validations.getAllRemindersValidation, getAllReminders);

//update reminders
router.put("/update", validations.updateReminderValidation, udpateAReminder);

//delete reminders
router.delete(
  "/delete",
  validations.deleteARemindersValidation,
  deleteAReminder
);
module.exports = router;
