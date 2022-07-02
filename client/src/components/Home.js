import React from "react";
import "../css/reminder.css";
const Home = () => {
  return (
    <>
      <div>
        <img
          class="intro"
          src={process.env.PUBLIC_URL + "/city.jpg"}
          alt="apartment"
        ></img>
      </div>
    </>
  );
};

export default Home;
