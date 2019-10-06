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
            "I used to think I was the only one who wanted to work in the
            intersection of music, medicine, and basketball. But through Day
            Zero, I met a friend who shared those exact interests! We're in
            different eating clubs so there's a "
          </div>
        </div>
      ) : (
        <div className="upper">
          <img
            src={require("../../img/carina.svg")}
            alt="Carina Lewis"
            className="circular-pic"
          />
          <div className="name carina">Carina Lewandowski</div>
          <div className="about">
            Carina is a CS junior and founder of ShinyRocket, a solar-powered
            jetpack startup. She's looking for people interested in trying it
            out! She's passionate about mindfulness, tech, and improving the
            world through engineering.
          </div>
        </div>
      )}
    </div>
  );
};

export default ExampleProfile;
