import React from "react";

import "./ExampleProfile.css";

const ExampleProfile = () => {
  return (
    <div>
      <div className="outer">
        <img
          src={require("../../img/max_kim.png")}
          alt="Max Kim"
          className="circular-pic"
        />
        <div className="name">Max Kim</div>
        <div className="about">
          Max is the founder of a virtual reality gaming company and wants to
          meet passionate entrepreneurs.
        </div>
      </div>
    </div>
  );
};

export default ExampleProfile;
