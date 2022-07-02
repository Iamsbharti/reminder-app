import React, { useEffect, useState } from "react";
import "../css/reminder.css";
import Button from "@mui/material/Button";
import {
  getAllReminderAction,
  deleteReminderAction,
} from "../redux/actions/reminderAction";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import history from "../library/history";

const Reminder = ({
  getAllReminderAction,
  deleteReminderAction,
  reminders,
  user,
}) => {
  const [reminderList, setReminderList] = useState([]);

  useEffect(() => {
    getAllReminderAction(user.userId);
  }, []);

  useEffect(() => {
    setReminderList(reminders);
  }, [reminders]);
  const deleteReminder = (reminderId) => {
    console.log("Delete reminder click::", reminderId);
    deleteReminderAction(reminderId);
  };
  const handleNavigation = (route) => {
    console.log("Handle navigation:", route);
    history.push(route);
  };

  return (
    <>
      <div className="reminders">
        {reminderList.length > 0 &&
          reminderList.map((reminder, index) => (
            <div className="reminder-post-card" id={index}>
              <p className="name">{reminder.title}</p>
              <hr />
              <p>
                Message : <span>{reminder.message}</span>
              </p>
              <p>
                Created On: <span>{reminder.createdOn}</span>
              </p>
              <p>
                Modified On: <span>{reminder.modifiedOn}</span>
              </p>
              <p>
                User: <span>{user.name}</span>
              </p>
              <p>
                Status: <span>{reminder.status}</span>
              </p>
              <div className="reminder-post-status">
                <Button
                  variant="contained"
                  onClick={() =>
                    handleNavigation(`/edit/${reminder.reminderId}`)
                  }
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#550303" }}
                  onClick={() => deleteReminder(reminder.reminderId)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        {reminderList.length <= 0 && (
          <div className="noReminders">
            <p>No Reminders Found</p>
            <Button
              variant="contained"
              onClick={() => handleNavigation("/add")}
            >
              ADD A Reminder
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
const mapStateToProps = ({ user, reminders }) => {
  console.log("map state to props: add reminder", user, reminders);
  return {
    user,
    reminders,
  };
};
const mapActionToProps = { getAllReminderAction, deleteReminderAction };
export default connect(mapStateToProps, mapActionToProps)(Reminder);
