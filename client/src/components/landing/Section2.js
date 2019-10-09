import React from "react";

const Section2 = () => {
  return (
    <div id="howitworks">
      {/* <div className="ui two column stackable center aligned grid">
        <h1 className="title">How Day Zero Works</h1> */}
      {/* <div className="ui middle aligned stackable grid container howitworks-table">
          <img
            src={require("../../img/rocket.svg")}
            className="svg-rocket"
            alt=""
          />
          <p>
            List your passions by choosing from a bunch of interests spanning
            professional goals, majors, hobbies, lifestyles, and more.
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
        </div> */}
      <div className="steps">
        <img
          src={require("../../img/interests.PNG")}
          className="select_interests"
          alt="interests graphic"
        />
        <p>
          <b>Step 1:</b> Select your interests from a list that spans
          industries, academic disciplines, hobbies, and more.
        </p>
      </div>
      <div className="steps">
        <img
          src={require("../../img/calendar.PNG")}
          className="select_time"
          alt="calendar graphic"
        />
        <p>
          <b>Step 2:</b> Tell us what days you're free to grab lunch, coffee, or
          dinner.
        </p>
      </div>
      <div className="steps">
        <img
          src={require("../../img/people.svg")}
          className="svg-people"
          alt=""
        />
        <p>
          <b>That's it!</b> Day Zero then automatically sends a group text to
          you and the person who shares the most interests with you so y'all can
          figure out where to meet! Your Day Zero dashboard will display their
          bio so you can learn about them before the meeting.
        </p>
      </div>
    </div>
    // </div>
  );
};

export default Section2;
