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
          <div className="about">
            "I used to think there was no one else who shared my interests, but
            boy was I wrong. The number of people doing cool shit at Princeton
            is mind-blowing." — Daniel Kim '21
          </div>
        </div>
      ) : (
        <div className="upper">
          <img
            src={require("../../img/carina.svg")}
            alt="Carina Lewis"
            className="circular-pic"
          />
          <div className="about">
            "After joining TI it was hard to meet new people outside the club,
            but through Day Zero, I've made great friends I probs would've never
            met before." — Carina Lewandowski '21
          </div>
        </div>
      )}
    </div>
  );
};

export default ExampleProfile;
