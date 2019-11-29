import React, { Fragment } from "react";
import LandingMobile from "./LandingMobile";
import Section1 from "./Section1";
import Section2 from "./Section2";
// import Section3 from "./Section3";

import "./Landing.css";

const Landing = () => {
  return (
    <Fragment>
      <section id="landing-mobile" className="landing">
        <LandingMobile />
      </section>
      <section id="landing" className="landing">
        <Section1 />
        <Section2 />
        {/* <Section3 /> */}
      </section>
    </Fragment>
  );
};

export default Landing;
