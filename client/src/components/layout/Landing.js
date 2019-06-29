import React from "react";

const Landing = () => {
  return (
    <section className="landing">
      {/* First section */}
      <div id="first" className="chunk">
        <div className="ui vertical stripe segment">
          <h1>Meeting interesting people just got a whole lot easier</h1>
          <p>Now Available At: </p>
          {/* images of stanford and princeton */}
          <button className="ui button basic blue big">
            <a href="register.html">FIND YOUR DAY ZEROS</a>
          </button>
        </div>
      </div>

      {/* Second section */}
      <div id="second" className="blu chunk">
        <div className="ui vertical stripe segment">
          <div className="ui middle aligned stackable grid container">
            <div>
              <h3 className="ui header">We Help Companies and Companions</h3>
              <p>
                We can give your company superpowers to do things that they
                never thought possible. Let us delight your customers and
                empower your needs...through pure data analytics.
              </p>
              <h3 className="ui header">We Make Bananas That Can Dance</h3>
              <p>
                Yes that's right, you thought it was the stuff of dreams, but
                even bananas can be bioengineered.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Third section */}
      <div id="third" className="chunk">
        <div className="ui vertical stripe segment">
          <div className="ui middle aligned stackable grid container" />
        </div>
      </div>
    </section>
  );
};

export default Landing;
