const User = require("../models/User");
const logger = require("../library/logger");
const apiResponse = require("../library/apiResponse");
const shortid = require("shortid");
const Reminder = require("../models/Reminder");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const addReminder = async (req, res) => {
  logger.info("Add reminder controller");
  const { title, message, sendTime, userId } = req.body;
  let createdOn = new Date().toLocaleString();
  let modifiedOn = new Date().toLocaleString();
  // new Reminder model
  let newReminder = {
    reminderId: shortid.generate(),
    title: title,
    message: message,
    sendTime: sendTime,
    userId: userId,
    createdOn: createdOn,
    modifiedOn: modifiedOn,
    status: `Next Reminder Will be sent on - ${sendTime}`,
  };
  // save reminder details
  Reminder.create(newReminder, (error, reminder) => {
    if (error) {
      return res
        .status(500)
        .json(apiResponse(true, "Internal Server Error", error.message));
    } else {
      let reminderInfo = reminder.toObject();
      res
        .status(200)
        .json(
          apiResponse(false, "Reminder Created Successfully", reminderInfo)
        );
    }
  });
};
const getAllReminders = async (_req, res) => {
  logger.info("Get all reminders controller for a user");
  const userId = _req.query.userId;
  await Reminder.find({ userId: userId }).exec((error, reminders) => {
    if (error) {
      return res
        .status(500)
        .json(apiResponse(true, "Internal Server Error", error.message));
    } else {
      res
        .status(200)
        .json(apiResponse(false, "Reminder Fetched Successfully", reminders));
    }
  });
};
const udpateAReminder = async (_req, res) => {
  logger.info("Update Reminder controller");
  const { title, message, sendTime, userId, reminderId } = _req.body;

  let updateReminderObject = {
    title: title,
    message: message,
    sendTime: sendTime,
    userId: userId,
    status: `Next Reminder Will be sent on - ${sendTime}`,
    modifiedOn: new Date().toLocaleString(),
  };

  // udpate reminder details
  Reminder.updateOne({ reminderId: reminderId }, updateReminderObject).exec(
    (error, updated) => {
      if (error) {
        return res
          .status(500)
          .json(apiResponse(true, "Internal Server Error", error.message));
      } else {
        Reminder.findOne({ reminderId: reminderId }).exec(
          (err, updatedReminder) => {
            res
              .status(200)
              .json(apiResponse(false, "Reminder updated", updatedReminder));
          }
        );
      }
    }
  );
};
const deleteAReminder = async (_req, res) => {
  logger.info("Delete a reminders controller for a user");
  const reminderId = _req.query.reminderId;
  console.log("queryL", reminderId);
  await Reminder.deleteOne({ reminderId: reminderId }).exec(
    (error, deleted) => {
      if (error) {
        return res
          .status(500)
          .json(apiResponse(true, "Internal Server Error", error.message));
      } else {
        console.log("deletedLL", deleted);
        let { deletedCount } = deleted;
        res
          .status(200)
          .json(
            apiResponse(
              false,
              "Reminder Deleted",
              `${deletedCount} document affected`
            )
          );
      }
    }
  );
};
// email theme configurations
const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    // Appears in header & footer of e-mails
    name: "Reminder App",
    link: "https://reminder-fsd-app.herokuapp.com",
    //logo: "https://mailgen.js/img/logo.png",
    copyright: "Copyright © 2022 Reminder App. All rights reserved.",
  },
});
// email contents
const emailBody = (title, message) => {
  return {
    body: {
      intro: title,
      outro: message,
    },
  };
};
const sendReminderEmail = async (result) => {
  logger.info("send reminder email");
  let sendEmailResult;
  const { message, title, email } = result;
  // get the email contents
  let emailContents = emailBody(title, message);
  //construst transport
  let transporter = nodemailer.createTransport({
    service: "yahoo",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });
  //configure mail options
  // Generate an HTML email with the provided contents
  let reminderEmail = mailGenerator.generate(emailContents);

  // Generate the plaintext version of the e-mail (for clients that do not support HTML)
  let emailText = mailGenerator.generatePlaintext(emailContents);

  let mailOptions = {
    from: "mera.bazzar@yahoo.com",
    to: email,
    subject: "Reminder Email @DO NOT REPLY",
    html: reminderEmail,
    text: emailText,
  };
  //send email
  let data = await transporter.sendMail(mailOptions);
  logger.info(`Response-${data}`);
  if (data) {
    sendEmailResult = Promise.resolve({
      ...result,
      Operation: "Email Sent",
    });
  } else {
    sendEmailResult = Promise.reject(
      formatResponse(true, 500, "Internal Server Error", {
        ...result,
        Operation: "Email Send Error",
      })
    );
  }
  return sendEmailResult;
};
module.exports = {
  addReminder,
  getAllReminders,
  deleteAReminder,
  udpateAReminder,
};
