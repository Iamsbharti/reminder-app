import { LOGIN, LOGIN_ERROR, LOGOUT } from "../actions/actionType";
import { user } from "../defaultStore";

export function userReducer(_user = user, action) {
  console.log("reducer::", action.loginResponse);
  switch (action.type) {
    case LOGIN:
      const { error, message, status, data } = action.loginResponse;
      return {
        ...data,
        login_status: "SUCCESS",
        error: error,
        message: message,
        status: status,
      };

    case LOGIN_ERROR:
      return { ...action.loginResponse, login_status: "FAILED", error: true };
    case LOGOUT:
      console.log("logout user user");
      return user;
    default:
      return _user;
  }
}
