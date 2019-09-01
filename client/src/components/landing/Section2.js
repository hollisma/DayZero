import React from "react";

const Section2 = () => {
  return (
    <div id="howitworks" className="blu chunk">
      <div className="ui vertical stripe segment">
        <h1>How Day Zero Works</h1>
        <div className="ui middle aligned stackable grid container howitworks-table">
          <img
            src={require("../../img/rocket.svg")}
            className="svg-rocket"
            alt=""
          />
          <p>
            Tell us what kind of people you'd like to meet. Entrepreneurs?
            Aspiring artists and musicians? People who love building rockets?
          </p>
          <img
            src={require("../../img/calendar.svg")}
            className="svg-calendar"
            alt=""
          />
          <p>
            Set your calendar for the times you're free to grab a meal of coffee
          </p>
          <img
            src={require("../../img/people.svg")}
            className="svg-people"
            alt=""
          />
          <p>
            Based on your interests, Day Zero will automatically match you with
            three other people to have a meal or coffee!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section2;
