import React from "react";
import { Link } from "react-router-dom";

const Section1 = () => {
  return (
    <div id="home" className="chunk">
      <div className="ui vertical stripe segment">
        <h1>Meeting interesting people just got a whole lot easier</h1>
        <p>Now Available At: </p>
        <div className="images">
          <img src={require("../../img/stanford")} alt="" />
          <img src={require("../../img/princeton")} alt="" />
        </div>
        <button className="ui button basic blue big">
          <Link to="/register">FIND YOUR DAY ZEROS</Link>
        </button>
      </div>
    </div>
  );
};

export default Section1;
