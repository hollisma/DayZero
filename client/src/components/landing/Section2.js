import React from "react";

const Section2 = () => {
  return (
    <div id="howitworks" className="background pic chunk">
      <div className="ui two column stackable center aligned grid">
        <h1 className="title">How Day Zero Works</h1>
        <div className="ui middle aligned stackable grid container howitworks-table">
          <img
            src={require("../../img/rocket.svg")}
            className="svg-rocket"
            alt=""
          />
          <p>
            Tell us your interests by choosing from a list that spans
            professional goals, majors, hobbies, lifestyles, etc.
          </p>
          <img
            src={require("../../img/calendar.svg")}
            className="svg-calendar"
            alt=""
          />
          <p>Tell us what days you're free to grab lunch or dinner.</p>
          <img
            src={require("../../img/people.svg")}
            className="svg-people"
            alt=""
          />
          <p>
            Day Zero automatically sends a group text to you and the person who
            shares the most interests with you so y'all can communicate and
            figure out where to meet!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section2;
