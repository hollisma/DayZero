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
            Dan aspires to be the best dancer of this era and enjoys art of all
            kinds, having also produced multiple rap albums. He's performed in
            music videos for Post Malone and Cardi B and is looking for people
            to collab on future projects with.
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
