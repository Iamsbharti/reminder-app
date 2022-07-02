import baseUrl from "./apiUtils";
import axios from "axios";
export const loginApi = async ({ loginId, password }) => {
  console.log("login apicall::", loginId, password, baseUrl);
  try {
    let response = await axios.post(`${baseUrl}/api/v1/reminder/login`, {
      loginId: loginId,
      password: password,
    });
    console.log("login-res::", response.data);
    // save user login response to local storage
    localStorage.setItem("user", JSON.stringify(response.data.data));
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const registerApi = async (userDetails) => {
  console.log("register api call", userDetails);
  const { userName, email, mobile, password } = userDetails;
  try {
    let response = await axios.post(`${baseUrl}/api/v1/reminder/register`, {
      name: userName,
      email: email,
      mobile: mobile,
      password: password,
    });
    console.log("register-res::", response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const logoutUser = () => {
  console.debug("user logout func");
  localStorage.removeItem("user");
};
