import React, { Fragment } from "react";
import LandingMobile from "./LandingMobile";
import LandingDesktop from "./LandingDesktop";

import "./Landing.css";

const Landing = () => {
  return (
    <Fragment>
      <section id="landing-mobile" className="landing">
        <LandingMobile />
      </section>
      <section id="landing-desktop" className="landing">
        <LandingDesktop />
      </section>
    </Fragment>
  );
};

export default Landing;
