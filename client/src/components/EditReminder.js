import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "react-toastify/dist/ReactToastify.css";
import "../css/reminder.css";
import { useHistory } from "react-router-dom";
import { updateReminderAction } from "../redux/actions/reminderAction";
import { connect } from "react-redux";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
const EditReminder = ({ updateReminderAction, reminder, user }) => {
  console.log("user ::", user);
  let history = useHistory();
  const [title, setTitle] = useState(reminder.title);
  const [message, setMessage] = useState(reminder.message);
  const [sendTime, setSendTime] = useState(reminder.sendTime);
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "message":
        setMessage(value);
        break;
      default:
    }
  };
  const handleSendTimeChange = (newValue) => {
    setSendTime(newValue);
  };

  const handleClearForm = () => {
    setMessage("");
    setTitle("");
    setSendTime("");
  };
  const handleUpdateReminder = async () => {
    console.log("Handle add reminder");
    let reminderDetails = {
      userId: user.userId,
      title,
      message,
      sendTime,
      reminderId: reminder.reminderId,
    };
    console.log("update::", reminderDetails);
    updateReminderAction(reminderDetails);
  };
  return (
    <>
      <div className="addReminder">
        <p className="welcome_text">Updating Reminder</p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            className="register"
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "40ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Enter Reminder Title"
              variant="outlined"
              name="title"
              onChange={handleChange}
              value={title}
            />
            <TextField
              label="Enter Reminder Message"
              variant="outlined"
              name="message"
              onChange={handleChange}
              value={message}
            />
            <DateTimePicker
              label="Date&Time picker"
              name="sendTime"
              value={sendTime}
              onChange={handleSendTimeChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
        </LocalizationProvider>
        <Box
          className="register2"
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "40ch" },
          }}
          noValidate
          autoComplete="off"
          style={{ marginLeft: "70px" }}
        >
          <Button
            variant="contained"
            onClick={handleUpdateReminder}
            disabled={title && message && sendTime ? false : true}
          >
            Save Changes
          </Button>
          <Button
            variant="contained"
            onClick={handleClearForm}
            disabled={title || message || sendTime ? false : true}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            onClick={() => history.push("/")}
            disabled={title || message || sendTime ? false : true}
          >
            Cancel
          </Button>
          <br />
        </Box>
      </div>
    </>
  );
};
const mapStateToProps = (state, ownProps) => {
  console.log("map state to props: update reminder:::", state);
  const reminderId = ownProps.match.params.reminderId;
  let currentReminder = state.reminders.filter(
    (f) => f.reminderId === reminderId
  );
  console.log("current reminder::", currentReminder);
  return {
    user: state.user,
    reminder: currentReminder[0],
  };
};
const mapActionToProps = { updateReminderAction };
export default connect(mapStateToProps, mapActionToProps)(EditReminder);
