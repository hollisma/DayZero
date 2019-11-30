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
            Register
          </a>
        </div>
      </div>
      <div className="middle">
        <div className="how-we-help">
          <div className="title">
            We help you quickly discover the people most relevant to you.
          </div>
          <div className="text">
            There are <span className="colorful">8,364</span> students at
            Princeton.
          </div>
          <div className="text">
            In 4 years, the average student only meets{" "}
            <span className="colorful">4.3%</span> of them.
          </div>
          <div className="text">
            <span className="colorful">Day Zero</span> connects you with people
            you'd most vibe with but have never met.
          </div>
        </div>
        <div className="people-cards">
          <div className="card-profile">
            <img
              src={require("../../img/carina_rec.PNG")}
              alt="Carina"
              className="card-pic"
            />
            <div className="text">
              "I recently got into fintech but I didn't know ppl passionate
              about it. But through DZ I got dinner with a really cool guy who
              has a fintech startup!"
            </div>
            <div className="name">Carina L. '21</div>
          </div>
          <div className="card-profile alt-background">
            <img
              src={require("../../img/dan_rec.PNG")}
              alt="Dan"
              className="card-pic"
            />
            <div className="text">
              "I didn't think there was anyone else super into music and
              mindfulness, but boy was I wrong. Day Zero helped me find such
              cool people hidden in plain sight."
            </div>
            <div className="name alt-text">Dan '21</div>
          </div>
          <div className="card-profile">
            <img
              src={require("../../img/marti_rec.PNG")}
              alt="Marti"
              className="card-pic"
            />
            <div className="text">
              "After joining TI it was hard to meet new people outside the club,
              but through Day Zero, I've made great friends I prob would've
              never met before."
            </div>
            <div className="name">Marti '20</div>
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
            src={require("../../img/friends_eating.PNG")}
            alt="background_desktop"
            className="pic"
          />
        </div>
        <div className="footer">
          <a href="/sign-up-landing" className="sign-up-button">
            Sign up
          </a>
          <div className="questions">Questions? Ask Away~</div>
          <div className="contact-us">
            Email us{" "}
            <a
              href="mailto:founders.dayzero@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <u>here</u>
            </a>
            !
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
