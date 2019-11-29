import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import "./LandingDesktop.css";

const LandingDesktop = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="dashboard" />;
  }

  return (
    <div id="landing-desktop" className="ui bigger-top-container">
      <div className="top">
        <div className="inner-box">
          <div className="big-text">
            Discover Princetonians who share your passions and values.
          </div>
          <div className="small-text">Signing up takes thirty seconds.</div>
          <a href="/sign-up-landing" className="sign-up-button">
            Sign up
          </a>
        </div>
      </div>
      <div className="middle">
        <div className="how-we-help">
          <div className="title">How We Help</div>
          <div className="text">
            There are <span className="colorful">8,364</span> students at
            Princeton.
          </div>
          <div className="text">
            In 4 years, you only meet <span className="colorful">4%</span> of
            them.
          </div>
          <div className="text">
            <span>Day Zero</span> connects you with people you'd most vibe with
            but have never met.
          </div>
        </div>
        <div className="people-cards">
          <div className="card-profile">
            <img
              src={require("../../img/carina.svg")}
              alt="Carina"
              className="card-pic"
            />
            <div className="text">
              "I recently got into fintech but I didn't know ppl passionate
              about it. But through DZ I got dinner with a really cool guy who
              has a fintech startup!"
            </div>
            <div className="name">Carina '21</div>
          </div>
          <div className="card-profile alt-background">
            <img
              src={require("../../img/carina.svg")}
              alt="Carina"
              className="card-pic"
            />
            <div className="text">
              "I recently got into fintech but I didn't know ppl passionate
              about it. But through DZ I got dinner with a really cool guy who
              has a fintech startup!"
            </div>
            <div className="name alt-text">Carina '21</div>
          </div>
          <div className="card-profile">
            <img
              src={require("../../img/carina.svg")}
              alt="Carina"
              className="card-pic"
            />
            <div className="text">
              "I recently got into fintech but I didn't know ppl passionate
              about it. But through DZ I got dinner with a really cool guy who
              has a fintech startup!"
            </div>
            <div className="name">Carina '21</div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="transition">With Day Zero, you can...</div>
        <div className="main-section">
          <div className="cards">
            <div className="card-background">
              <div className="card">
                Search for peers based on shared interests
              </div>
            </div>
            <div className="card-background">
              <div className="card">Find out who are in your classes</div>
            </div>
            <div className="card-background">
              <div className="card">Schedule meals with like-minded people</div>
            </div>
          </div>
          <img
            src={require("../../img/landing_page_picture.jpg")}
            alt="Carina"
            className="pic"
          />
        </div>
        <div className="footer">
          <a href="/desktop-landing" className="sign-up-button">
            Sign up
          </a>
          <div className="questions">Questions? Ask Away~</div>
          <div className="contact-us">
            Email us at founders.dayzero@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
};

LandingDesktop.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(LandingDesktop);
