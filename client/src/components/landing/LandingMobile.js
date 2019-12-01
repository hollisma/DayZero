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
          Discover Princetonians who share your passions.
        </div>
        <div className="small-text">Signing up takes thirty seconds</div>
        <a href="/#sign-up-button" className="sign-up-button">
          Register
        </a>
      </div>
      <div className="middle">
        <div className="title">
          Quickly discover the people most relevant to you.
        </div>
        <div className="text">
          There are <span className="colorful">8,364</span> students at
          Princeton.
        </div>
        <div className="text">
          In 4 years, you only meet <span className="colorful">4.3%</span> of
          them.
        </div>
        <div className="text">
          <span className="colorful">Day Zero</span> makes it easy to discover
          and grab meals with the people that share your passions and values but
          you've never met.
        </div>
        <div className="card-profile">
          <img
            src={require("../../img/carina_rec.svg")}
            alt="Carina"
            className="card-pic"
          />
          <div className="text">
            Day Zero made it easy for me to find other people passionate about
            fintech. Last week I got dinner with a guy who has his own fintech
            startup!"
          </div>
          <div className="name">Carina '21</div>
        </div>
      </div>
      <div className="bottom">
        <div className="transition">With Day Zero, you can...</div>
        <div className="card-background">
          <div className="card-possibility">
            Find peers who share your passions and values
          </div>
        </div>
        <div className="card-background">
          <div className="card-possibility">
            Get automatically matched with like-minded people for a meal
          </div>
        </div>
        <div className="card-background">
          <div className="card-possibility">
            Find out who are in your classes{" "}
          </div>
        </div>
        <a
          id="sign-up-button"
          href="/sign-up-landing"
          className="sign-up-button"
        >
          Sign up
        </a>
        <div className="questions">
          Got questions or feedback? Email us{" "}
          <a
            href="mailto:founders.dayzero@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <u>here</u>
          </a>
        </div>
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
