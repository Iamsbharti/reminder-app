import React, { Fragment } from "react";
import "../css/header.css";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { logOutAction } from "../redux/actions/userAction";
import history from "../library/history";
import { toast } from "react-toastify";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleMenuBar: true,
    };
  }
  handleLogout() {
    console.log("user logout");
    this.props.logOutAction();
    toast.success("See You Soon !!!");
    history.push("/login");
  }
  handleNavigation(route) {
    console.log("Handle navigation:", route);
    history.push(route);
  }
  handleToggleMenu = () => {
    console.log("toggle menu side bar::");
    this.setState({ toggleMenuBar: !this.state.toggleMenuBar });
  };
  render() {
    const userWelcome = (
      <>
        <div className="account__div">
          <li className="nav-item nav-link text-white mt-3 nav_cart_alignment">
            <div className="nav_badge_alignment">
              Welcome, {this.props.user.name}
            </div>
            <i
              className="fa fa-sign-out"
              aria-hidden="true"
              onClick={() => this.handleLogout()}
              title="logout"
            ></i>
          </li>
        </div>
      </>
    );
    return (
      <Fragment>
        <div className="non__mobile__nav">
          <nav className="navbar-static-top nav__bar navbar-expand ">
            <ul className="collapse navbar-collapse nav__links">
              <li
                className="nav-item nav-link text-white mt-3"
                onClick={() => this.handleNavigation("/home")}
              ></li>
              {this.props.user.login_status === "SUCCESS" ? (
                <>
                  <li
                    className="nav-item nav-link text-white mt-3"
                    onClick={() => this.handleNavigation("/add")}
                  >
                    Add A Reminder
                  </li>
                  <li
                    className="nav-item nav-link text-white mt-3"
                    onClick={() => this.handleNavigation("/reminder")}
                  >
                    Show All Reminders
                  </li>
                </>
              ) : (
                ""
              )}

              <li
                className="nav-item nav-link text-white mt-3"
                onClick={() => this.handleNavigation("/login")}
              >
                Reminder App
              </li>
              {this.props.user.login_status === "SUCCESS" ? (
                userWelcome
              ) : (
                <>
                  <div className="nav_cart_alignment">
                    <li className="nav-item nav-link text-white mt-2">
                      <button
                        type="submit"
                        className="btn  btn-sm btn-block login_header_btn"
                        onClick={() => this.handleNavigation("/login")}
                      >
                        Login
                      </button>
                    </li>
                  </div>
                </>
              )}
            </ul>
          </nav>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ user }) => {
  console.log("header::", user);
  return { user };
};
const mapActionToProps = { logOutAction };
export default connect(mapStateToProps, mapActionToProps)(Header);
