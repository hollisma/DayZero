import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import "./LandingMobile.css";

const LandingMobile = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="dashboard" />;
  }

  return (
    <div id="landing-mobile" className="ui bigger-top-container">
      <div className="top">
        <div className="big-text">
          Discover Princetonians who share your passions and values.
        </div>
        <div className="small-text">Signing up takes thirty seconds</div>
        <a href="/sign-up-landing" className="sign-up-button">
          Sign up
        </a>
      </div>
      <div className="middle">
        <div className="text">
          There are <span className="colorful">8,364</span> students at
          Princeton.
        </div>
        <div className="text">
          In 4 years, you only meet <span className="colorful">4%</span> of
          them.
        </div>
        <div className="text">
          <span className="colorful">Day Zero</span> connects you with people
          you'd most vibe with but have never met.
        </div>
        <div className="card-profile">
          <img
            src={require("../../img/carina_rec.PNG")}
            alt="Carina"
            className="card-pic"
          />
          <div className="text">
            "I recently got into fintech but I didn't know ppl passionate about
            it. But through DZ I got dinner with a really cool guy who has a
            fintech startup!"
          </div>
          <div className="name">Carina '21</div>
        </div>
      </div>
      <div className="bottom">
        <div className="transition">With Day Zero, you can...</div>
        <div className="card-background">
          <div className="card-possibility">
            Search for peers based on shared interests
          </div>
        </div>
        <div className="card-background">
          <div className="card-possibility">
            Find out who are in your classes
          </div>
        </div>
        <div className="card-background">
          <div className="card-possibility">
            Schedule meals with like-minded people
          </div>
        </div>
        <a href="/sign-up-landing" className="sign-up-button">
          Sign up
        </a>
        <div className="questions">Questions?</div>
        <div className="questions">Ask away~</div>
        <div className="contact-us">Email us at founders.dayzero@gmail.com</div>
      </div>
    </div>
  );
};

LandingMobile.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(LandingMobile);
