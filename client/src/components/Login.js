import React, { Fragment } from "react";
import "../css/App.css";
import { connect } from "react-redux";
import { userAction } from "../redux/actions/userAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_email: "",
      password: "",
      user: "",
      loginResponse: "",
      time: "",
    };
  }

  handleChange(e, field, value) {
    e.preventDefault();
    this.setState({
      [field]: value,
    });
  }

  handleSubmit(e) {
    console.log("login submit component");
    e.preventDefault();
    let userInfo = {
      loginId: this.state.user_email,
      password: this.state.password,
    };
    console.log("userInfo:", userInfo);
    this.props.userAction(userInfo);
  }
  handleTestUserLogin() {
    console.log("test login submit component");
    let userInfo = {
      loginId: process.env.REACT_APP_TEST_USER_EMAIL,
      password: process.env.REACT_APP_TEST_USER_PWD,
    };
    console.log("userInfo:", userInfo);
    this.props.userAction(userInfo);
  }
  componentDidUpdate(prevProps, _prevState) {
    // handle post login i.e. user state
    if (prevProps.user !== this.props.user) {
      console.log("user state has changed.");
      const { message, login_status } = this.props.user;
      toast.success(message);
      if (login_status !== "FAILED") {
        console.log("route to dashboard");
        this.setState({
          loginResponse: `Authentication Success :: Redirecting to home...`,
        });
        setTimeout(() => {
          this.props.history.push("/reminder");
        }, 1500);
      } else {
        this.setState({
          loginResponse: `Authentication failed :: Try Again`,
        });
        setTimeout(() => this.setState({ loginResponse: "" }), 1500);
      }
    }
  }

  render() {
    return (
      <Fragment>
        <div className="login-header">Login</div>
        <div className="login-form">
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <div className="form-group login-block-alignment">
              <label>Email / Mobile number</label>
              <input
                type="text"
                className="form-control login-input"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(e) =>
                  this.handleChange(e, "user_email", e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control login-input"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={(e) =>
                  this.handleChange(e, "password", e.target.value)
                }
              />
            </div>
            <div className="btn__div">
              <button
                type="submit"
                className="btn btn-primary btn-sm btn-block login-btn"
              >
                Submit
              </button>
              <div className="forgot__pwd__div">
                <span onClick={() => this.props.history.push("/register")}>
                  New User?
                </span>
              </div>
            </div>
          </form>
        </div>
        <div
          className="test-user-login"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "-30px",
          }}
        >
          <button
            type="submit"
            className="btn btn-secondary btn-sm btn-block test-login-btn"
            onClick={() => this.handleTestUserLogin()}
          >
            Test User Login
          </button>
        </div>
        <div
          style={{
            color: this.props.user.login_status === "FAILED" ? "red" : "green",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <span>{this.state.loginResponse}</span>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ user }) => {
  console.log("Login Component:", user);
  return { user };
};
const mapActionToProps = {
  userAction,
};
export default connect(mapStateToProps, mapActionToProps)(Login);
