import React from "react";

import "./profile.css";

const ExampleProfile = ({ firstName }) => {
  return (
    <div>
      {firstName === "max" ? (
        <div className="outer">
          <img
            src={require("../../img/max.png")}
            alt="Max Kim"
            className="circular-pic"
          />

          <div className="name">Max Kim</div>
          <div className="about">
            Max is the founder of a virtual reality gaming company and wants to
            meet passionate entrepreneurs.
          </div>
        </div>
      ) : (
        <div className="outer">
          <img
            src={require("../../img/carina.png")}
            alt="Carina Lewis"
            className="circular-pic carina"
          />
          <div className="name carina">Carina Lewis</div>
          <div className="about">
            Carina is studying Philosophy and wants to meet people who are
            interested in foreign policy and moral philosophy!
          </div>
        </div>
      )}
    </div>
  );
};

export default ExampleProfile;
