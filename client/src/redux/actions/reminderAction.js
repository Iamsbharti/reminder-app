import {
  ADD_REMINDER,
  ADD_REMINDER_ERROR,
  DELETE_REMINDER,
  DELETE_REMINDER_ERROR,
  GET_ALL_REMINDER,
  GET_ALL_REMINDER_ERROR,
  UPDATE_REMINDER,
  UPDATE_REMINDER_ERROR,
} from "./actionType";
import * as apis from "../../apis/reminderApis";
import { toast } from "react-toastify";
import history from "../../library/history";
export function addReminderAction(userInfo) {
  return async (dispatch) => {
    let response = await apis.addReminderApi(userInfo);
    console.log("response action", response);
    const { error } = response;
    toast.success(response.message);
    error
      ? dispatch({ type: ADD_REMINDER_ERROR, response })
      : dispatch({ type: ADD_REMINDER, response });

    // dispatch error
    if (!error) {
      console.error("add reminder error");
    }
  };
}

export function getAllReminderAction(userId) {
  return async (dispatch) => {
    let response = await apis.getAllreminders(userId);
    console.log("get all ReminderResponse action", response);
    const { error } = response;
    toast.success(response.message);

    error
      ? dispatch({ type: GET_ALL_REMINDER_ERROR, response })
      : dispatch({ type: GET_ALL_REMINDER, response });

    // dispatch error
    if (!error) {
      console.error("get reminder error");
    }
  };
}

export function updateReminderAction(reminderInfo) {
  return async (dispatch) => {
    let response = await apis.updateReminder(reminderInfo);
    console.log("get all ReminderResponse action", response);
    const { error } = response;
    toast.success(response.message);
    history.push("/reminder");
    !error
      ? dispatch({ type: UPDATE_REMINDER, response })
      : dispatch({ type: UPDATE_REMINDER_ERROR, response });

    // dispatch error
    if (!error) {
      console.error("update reminder error");
    }
  };
}

export function deleteReminderAction(reminderInfo) {
  return async (dispatch) => {
    let response = await apis.deleteReminder(reminderInfo);
    console.log("delete ReminderResponse action", response);
    const { error } = response;
    toast.success(response.message);
    !error
      ? dispatch({
          type: DELETE_REMINDER,
          reminderInfo,
        })
      : dispatch({ type: DELETE_REMINDER_ERROR, response });

    // dispatch error
    if (!error) {
      console.error("delete reminder error");
    }
  };
}
