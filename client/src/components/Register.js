import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/App.css";
import { registerApi } from "../apis/userApis";
import { useHistory } from "react-router-dom";

const Register = () => {
  let history = useHistory();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  let [confirmPwd, setConfirmPwd] = useState("");
  let [LOADING, setLoading] = useState(false);
  let [error, setError] = useState("Processing...");
  let [errorClassName, setClassName] = useState("");
  let [pwdValidationError, setPwdValidError] = useState("");
  let [pwdMatchError, setPwdMatchError] = useState("");
  let [doesPwdMatch, setDoesPwdMatch] = useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "userName":
        setUserName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "mobile":
        setMobile(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPwd":
        setConfirmPwd(value);
        break;
      default:
    }
  };
  const handleClearForm = () => {
    setUserName("");
    setMobile("");
    setPassword("");
    setEmail("");
    setConfirmPwd("");
  };
  const handleRegisterUser = async (e) => {
    e.preventDefault();
    console.log("register user");
    setLoading(true);
    setError("Processing...");
    let userDetails = { userName, email, mobile, password };
    const signUpResult = await registerApi(userDetails);
    console.log("register user result::", signUpResult);
    let { error, message } = signUpResult;
    /**set up error message */
    setError(message);
    /**set classname based on error */
    error ? setClassName("signup__error") : setClassName("signup__success");
    /**clear the form */
    if (error) {
      if (message === "") {
        setError("Try Again...");
      }
      setTimeout(() => {
        handleClearForm();
      }, 3000);
    } else {
      setDoesPwdMatch();
      setPwdMatchError("");
      setPwdValidError("");
      toast.success("you have been signedUp");
      setTimeout(() => {
        setError("You are being redirected to login page");
      }, 2000);
      setTimeout(() => {
        history.push("/login");
      }, 3000);
    }
  };
  return (
    <>
      <div>
        <p className="welcome-text">Add your details</p>
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
            label="Enter Your Name"
            variant="outlined"
            name="userName"
            onChange={handleChange}
            value={userName}
          />
          <TextField
            label="your Email"
            variant="outlined"
            name="email"
            onChange={handleChange}
            value={email}
          />
        </Box>
        <Box
          className="register1"
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "40ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            onChange={handleChange}
            value={password}
          />
          <TextField
            label="Mobile"
            variant="outlined"
            name="mobile"
            onChange={handleChange}
            value={mobile}
          />
        </Box>
        <Box
          className="register2"
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "40ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <Button
            variant="contained"
            onClick={handleRegisterUser}
            disabled={userName && mobile && email && password ? false : true}
          >
            Register
          </Button>
          <Button
            variant="contained"
            onClick={handleClearForm}
            disabled={userName || mobile || password ? false : true}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            onClick={() => history.push("/")}
            disabled={userName || mobile || password ? false : true}
          >
            Cancel
          </Button>
          <br />
          <span className="auth__status">
            <code className={errorClassName}>{LOADING && error}</code>
          </span>
        </Box>

        <ToastContainer autoClose={3000} hideProgressBar />
      </div>
    </>
  );
};
export default Register;
