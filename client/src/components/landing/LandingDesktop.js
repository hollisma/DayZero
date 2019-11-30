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
      <div id="top">
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
      <div id="discover"></div>
      <div id="middle">
        <div className="how-we-help">
          <div className="title">
            Quickly discover the people most relevant to you.
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
            <span className="colorful">Day Zero</span> makes it easy to discover
            and grab meals with the people that share your passions and values
            but you've never met.
          </div>
        </div>
        <div className="people-cards">
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
            <div className="name">Carina L. '21</div>
          </div>
          <div className="card-profile alt-background">
            <img
              src={require("../../img/dan_rec.svg")}
              alt="Dan"
              className="card-pic"
            />
            <div className="text">
              "I didn't think there was anyone else super into music and
              mindfulness, but boy was I wrong. Day Zero helped me find such
              cool people hidden in plain sight."
            </div>
            <div className="name alt-text">Dan K. '21</div>
          </div>
          <div className="card-profile">
            <img
              src={require("../../img/marti_rec.svg")}
              alt="Marti"
              className="card-pic"
            />
            <div className="text">
              "After joining TI it was hard to meet new people outside the club,
              but through DZ, I've met fantastic people I prob would've never
              ran into otherwise."
            </div>
            <div className="name">Marti V. '20</div>
          </div>
        </div>
      </div>
      <div id="possibilities"></div>
      <div id="bottom">
        <div className="transition">With Day Zero, you can...</div>
        <div className="main-section">
          <div className="cards">
            <div className="card-background">
              <div className="card">
                Discover peers who share your passions and values
              </div>
            </div>
            <div className="card-background">
              <div className="card">
                Get automatically matched with like-minded people for a meal
              </div>
            </div>
            <div className="card-background">
              <div className="card">Find out who are in your classes</div>
            </div>
          </div>
          <img
            src={require("../../img/friends_eating.PNG")}
            alt="background_desktop"
            className="pic"
          />
        </div>
        <div id="footer">
          <a href="/sign-up-landing" className="sign-up-button">
            Sign up
          </a>
          <div className="questions">
            If you have feedback or questions, we'd love to hear from you! Email
            us{" "}
            <a
              href="mailto:founders.dayzero@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <u>here.</u>
            </a>
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
