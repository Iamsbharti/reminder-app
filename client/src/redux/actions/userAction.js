import { LOGIN, LOGIN_ERROR, LOGOUT } from "./actionType";
import * as apis from "../../apis/userApis";

export function userAction(userInfo) {
  return async (dispatch) => {
    let loginResponse = await apis.loginApi(userInfo);
    console.log("loginresponse action", loginResponse);
    const { error } = loginResponse;
    error
      ? dispatch({ type: LOGIN_ERROR, loginResponse })
      : dispatch({ type: LOGIN, loginResponse });

    // dispatch error
    if (!error) {
      console.error("login error");
    }
  };
}

export function logOutAction() {
  console.debug("logout action taken");
  return (dispatch) => {
    apis.logoutUser();
    dispatch({ type: LOGOUT });
  };
}
