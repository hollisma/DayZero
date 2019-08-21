import React from "react";

import "./ExampleProfile.css";

const ExampleProfile = ({ firstName }) => {
  return (
    <div>
      <div className="outer">
        {firstName === "max" ? (
          <img
            src={require("../../img/max_kim.png")}
            alt="Max Kim"
            className="circular-pic"
          />
        ) : (
          <img
            src={require("../../img/carina_lewis.png")}
            alt="Carina Lewis"
            className="circular-pic"
          />
        )}
        <div className="name">
          {firstName === "max" ? "Max Kim" : "Carina Lewis"}
        </div>
        <div className="about">
          {firstName === "max"
            ? "Max is the founder of a virtual reality gaming company and wants to meet passionate entrepreneurs."
            : "Carina is studying Philosophy and wants to meet people who are interested in foreign policy and moral philosophy!"}
        </div>
      </div>
    </div>
  );
};

export default ExampleProfile;
