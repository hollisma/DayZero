import React from "react";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";

import "./Landing.css";

const Landing = () => {
  return (
    <section id="landing" className="landing">
      <Section1 />
      <Section2 />
      <Section3 />
    </section>
  );
};

export default Landing;
