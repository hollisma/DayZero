import React from "react";

const Section2 = () => {
  return (
    <p id="howitworks" className="blu chunk">
      <p className="ui vertical stripe segment">
        <h1>How Day Zero Works</h1>
        <p className="ui middle aligned stackable grid container">
          <img src={require("../../img/three-group")} alt="" />
          <p>
            Tell us what kind of people you'd like to meet. Entrepreneurs?
            Aspiring artists and musicians? People who love building rockets?
          </p>
          <img src={require("../../img/three-group")} alt="" />
          <p>
            Set your calendar for the times you're free to grab a meal of coffee
          </p>
          <img src={require("../../img/three-group")} alt="" />
          <p>
            Based on your interests, Day Zero will automatically match you with
            three other people to have a meal or coffee!
          </p>
        </p>
      </p>
    </p>
  );
};

export default Section2;
