import React from "react";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";

const Landing = () => {
  return (
    <section id="landing" className="landing">
      <Section1 />

      {/* Second section */}
      <Section2 />

      {/* Third section */}
      <Section3 />
    </section>
  );
};

export default Landing;
