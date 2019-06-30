import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section id="landing" className="landing">
      {/* First section */}
      <div id="first" className="chunk">
        <div className="ui vertical stripe segment">
          <h1>Meeting interesting people just got a whole lot easier</h1>
          <p>Now Available At: </p>
          {/* images of stanford and princeton */}
          <button className="ui button basic blue big">
            <Link to="/register">FIND YOUR DAY ZEROS</Link>
          </button>
        </div>
      </div>

      {/* Second section */}
      <div id="second" className="blu chunk">
        <div className="ui vertical stripe segment">
          <div className="ui middle aligned stackable grid container">
            <div>
              <h1>How Day Zero Works</h1>
              <div className="section">
                <img src={require("../../img/three-group")} />
                <p>
                  Tell us what kind of people you'd like to meet. Entrepreneurs?
                  Aspiring artists and musicians? People who love building
                  rockets?
                </p>
              </div>
              <div className="section">
                <img src={require("../../img/three-group")} />
                <p>
                  Set your calendar for the times you're free to grab a meal of
                  coffee
                </p>
              </div>
              <div className="section">
                <img src={require("../../img/three-group")} />
                <p>
                  Based on your interests, Day Zero will automatically match you
                  with three other people to have a meal or coffee!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Third section */}
      <div id="third" className="chunk">
        <div className="ui vertical stripe segment">
          <div className="ui middle aligned stackable grid container">
            <div>
              <h3 className="ui header">Who are we?</h3>
              <p>A couple of dumb guys that want to meet people</p>
              <h3 className="ui header">How am I being matched?</h3>
              <p>
                We have curated a complicated, state-of-the-art matching
                algorithm designed for opitmal user satisfaction. Aka, we use a
                random number generator
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
