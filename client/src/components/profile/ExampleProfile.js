import React from "react";

import "./profile.css";

const ExampleProfile = ({ firstName }) => {
  return (
    <div>
      {firstName === "dan" ? (
        <div className="lower">
          <img
            src={require("../../img/dan.svg")}
            alt="Dan Kim"
            className="circular-pic"
          />
          <div className="name">Daniel Kim</div>
          <div className="about">
            Dan aspires to be one of the best dancers of his generation but
            enjoys art forms of all kinds, having also produced multiple rap
            albums. He wants to meet other icons at Princeton who enjoy
            expressing themselves creatively.
          </div>
        </div>
      ) : (
        <div className="upper">
          <img
            src={require("../../img/carina.svg")}
            alt="Carina Lewis"
            className="circular-pic"
          />
          <div className="name carina">Carina Lewis</div>
          <div className="about">
            Carina is a CS junior and founder of RocketJump, a solar-powered
            jetpack startup. She recently fell in love with yoga and wants to
            meet people who are as passionate about mindfulness and tech as she
            is.
          </div>
        </div>
      )}
    </div>
  );
};

export default ExampleProfile;
