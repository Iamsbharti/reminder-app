import { userReducer } from "./userReducer";
import { reminderReducer } from "./reminderReducers";

import { combineReducers } from "redux";

export default combineReducers({
  user: userReducer,
  reminders: reminderReducer,
});
