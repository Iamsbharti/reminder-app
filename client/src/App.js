import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Reminder from "./components/Reminder";
import AddReminder from "./components/AddReminder";
import EditReminder from "./components/EditReminder";
function App() {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/reminder" exact component={Reminder} />
        <Route path="/add" exact component={AddReminder} />
        <Route path="/edit/:reminderId" exact component={EditReminder} />
      </Switch>
      <Footer />
      <ToastContainer autoClose={3000} hideProgressBar />
    </React.Fragment>
  );
}

export default App;
