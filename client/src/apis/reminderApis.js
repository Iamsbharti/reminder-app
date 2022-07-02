import baseUrl from "./apiUtils";
import axios from "axios";
import { toast } from "react-toastify";
import history from "../library/history";
/**
 * 
 * @param { "userId": "VDzNLQSd0",
    "title":"House",
    "message":"Sell your house",
    "sendTime":"02/07/2022, 14:11:55"} param0 
 * @returns 
 */
export const addReminderApi = async ({ title, message, sendTime, userId }) => {
  console.log("addreminder apicall::", title, message, sendTime);
  try {
    let response = await axios.post(`${baseUrl}/api/v1/reminder/add`, {
      title,
      message,
      sendTime,
      userId,
    });
    console.log("add reminder-res::", response.data);
    toast.success(response.message);
    history.push("/reminder");
    localStorage.setItem("user", JSON.stringify(response.data.data));
    return response.data;
  } catch (error) {
    return error.response;
  }
};
export const getAllreminders = async (userId) => {
  console.log("get all reminders:", userId);
  try {
    let response = await axios.get(
      `${baseUrl}/api/v1/reminder/get/id?userId=${userId}`
    );
    console.log("get all reminders ::", response.data);
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
};
/**
 * 
 * @returns {
    "userId": "VDzNLQSd0",
    "title": "Domain",
    "message": "Buy A Domain & Server",
    "sendTime": "02/08/2022, 16:11:55",
    "reminderId": "Fq-Ei8b9u"
}
 */
export const updateReminder = async ({
  userId,
  title,
  message,
  sendTime,
  reminderId,
}) => {
  console.log("update reminder:", userId);
  try {
    let response = await axios.put(`${baseUrl}/api/v1/reminder/update`, {
      title,
      message,
      sendTime,
      reminderId,
      userId,
    });
    console.log("update reminder-res::", response.data);
    toast.success(response.message);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const deleteReminder = async (reminderId) => {
  console.log("delete  reminders:", reminderId);
  try {
    let response = await axios.delete(
      `${baseUrl}/api/v1/reminder/delete?reminderId=${reminderId}`
    );
    console.log("delete reminders ::", response.data);
    toast.success(response.message);
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
};
