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
            When you sign up, you tell us what kind of people you'd like to
            meet. People interested in entrepreneurship? Creative writing?
            Mental models? Blockchain? You can select any number of interests
            and based on these, we will people who share the same interets as
            you.
          </p>
          <img
            src={require("../../img/calendar.svg")}
            className="svg-calendar"
            alt=""
          />
          <p>
            Set your calendar for the times you're free to grab lunch or dinner.
          </p>
          <img
            src={require("../../img/people.svg")}
            className="svg-people"
            alt=""
          />
          <p>
            Based on your interests and available times, Day Zero will connect
            you with the person who shares the most passions with you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section2;
