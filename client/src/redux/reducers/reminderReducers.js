import {
  ADD_REMINDER,
  ADD_REMINDER_ERROR,
  DELETE_REMINDER,
  GET_ALL_REMINDER,
  UPDATE_REMINDER,
} from "../actions/actionType";
import { reminders } from "../defaultStore";

export function reminderReducer(_reminders = reminders, action) {
  console.log("reminder reducer::", action);
  switch (action.type) {
    case ADD_REMINDER: {
      let { data } = action.response;
      console.log("ADD_REMINDER::", data);
      return {
        ..._reminders,
        data,
      };
    }
    case ADD_REMINDER_ERROR: {
      return {
        ...action.response,
        error: true,
      };
    }
    case GET_ALL_REMINDER: {
      return action.response;
    }
    case UPDATE_REMINDER: {
      let { data } = action.response;
      return _reminders.map((r) =>
        r.reminderId === data.reminderId ? { ...r, data } : r
      );
    }
    case DELETE_REMINDER: {
      let reminderId = action.reminderInfo;
      return _reminders.filter((r) => r.reminderId !== reminderId);
    }
    default:
      return _reminders;
  }
}
