import React from "react";

const Landing = () => {
  return (
    <section className="landing">
      <div className="landing-inner">
        <h1>Meeting interesting people just got a whole lot easier</h1>
        <p>Now Available At: </p>
        {/* images of stanford and princeton */}
        <button className="ui button basic blue big">
          <a href="register.html">FIND YOUR DAY ZEROS</a>
        </button>
      </div>
    </section>
  );
};

export default Landing;
