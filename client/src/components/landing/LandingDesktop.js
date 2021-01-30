import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

import "./LandingDesktop.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const LandingDesktop = ({ register, isAuthenticated }) => {
  const [formData, setFromData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const { name, email, password } = formData;

  const onChange = e =>
    setFromData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (!email) {
      MySwal.fire({
        title: "Please enter your email",
        type: "error"
      });
    } else if (!isSchoolEmail(email)) {
      MySwal.fire({
        title: "Please enter your Princeton email",
        type: "error"
      });
    } else if (password.length < 6) {
      MySwal.fire({
        title: "Password must be at least 6 characters",
        type: "error"
      });
    } else {
      register({ name, email, password });
    }
  };

  const isSchoolEmail = email => {
    let extension = email.split("@")[1];
    let validExtensions = ["princeton.edu"];

    for (let ext of validExtensions) {
      if (extension === ext) {
        return true;
      }
    }

    if (email === 'hkh4@williams.edu') return true;

    return false;
  };

  if (isAuthenticated) {
    return <Redirect to="dashboard" />;
  }

  return (
    <div id="landing-desktop" className="ui bigger-top-container">
      <div id="top">
        <div className="inner-box">
          <div className="big-text">
            Discover Princetonians who share your passions
          </div>
          <div className="small-text">
            Day Zero is a new platform for meeting people online and offline 
            {/* Day Zero is the only platfrom for meeting like-minded people. */}
          </div>
          <a href="/#register" className="sign-up-button">
            Register
          </a>
        </div>
      </div>
      <div id="discover"></div>
      <div id="middle">
        <div className="how-we-help">
          <div className="title">
            Quickly discover and meet new people
          </div>
          <div className="text">
            There are over <span className="colorful">8,000</span> students at
            Princeton.
          </div>
          <div className="text">
            Meeting them has become <span className="colorful">harder than ever.</span>
          </div>
          {/* <div className="text">
            In 4 years, the average student only meets{" "}
            <span className="colorful">4.3%</span> of them.
          </div> */}
          <div className="text">
            <span className="colorful">Day Zero</span> makes it easier to discover
            and connect with people that share your passions and values.
          </div>
        </div>
        <div className="people-cards">
          <div className="card-profile">
            <img
              src={require("../../img/carina_rec.svg")}
              alt="Carina"
              className="card-pic"
            />
            <div className="bottom-card">
              <div className="text">
                "Day Zero made it easy for me to find other people passionate
                about fintech. Last week I got dinner with a guy who has his own
                fintech startup!"
              </div>
              <div className="name">Carina '21</div>
            </div>
          </div>
          <div className="card-profile alt-background">
            <img
              src={require("../../img/dan_rec.svg")}
              alt="Dan"
              className="card-pic"
            />
            <div className="bottom-card">
              <div className="text">
                "I didn't think there was anyone else super into music and
                mindfulness, but boy was I wrong. Day Zero helped me find such
                cool people hidden in plain sight."
              </div>
              <div className="name alt-text">Dan '21</div>
            </div>
          </div>
          <div className="card-profile">
            <img
              src={require("../../img/marti_rec.svg")}
              alt="Marti"
              className="card-pic"
            />
            <div className="bottom-card">
              <div className="text">
                "After joining TI it was hard to meet new people outside the
                club, but through DZ, I've met fantastic people I prob would've
                never ran into otherwise."
              </div>
              <div className="name">Marti '20</div>
            </div>
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
                Discover students who share your passions and values
              </div>
            </div>
            <div className="card-background">
              <div className="card">
                Get matched with someone for a walk, meal, 
                or call
              </div>
            </div>
            <div className="card-background">
              <div className="card">Find out who is in your classes</div>
            </div>
          </div>
          <img
            src={require("../../img/friends_eating.PNG")}
            alt="background_desktop"
            className="pic"
          />
        </div>
      </div>
      <div id="register"></div>
      <div id="footer-desktop">
        <div className="thirty">Only thirty seconds to register!</div>
        <form className="ui form login-stuff" onSubmit={e => onSubmit(e)}>
          <div className="login-info">
            <div className="field">
              <input
                type="email"
                placeholder="Princeton Email Address"
                name="email"
                value={email}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="field">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={e => onChange(e)}
              />
            </div>
          </div>
          <input type="submit" className="sign-up-button" value="Register" />
        </form>
        <p className="already">
          Already have an account?{" "}
          <Link to="/login" className="alatsi">
            Sign In
          </Link>
        </p>
        {/* <a
            id="sign-up-button"
            href="/sign-up-landing"
            className="sign-up-button"
          >
            Sign up
          </a> */}
      </div>
      <div className="questions">
        Got questions or feedback? Email us{" "}
        <a
          href="mailto:founders.dayzero@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <u className="alatsi">here</u>
        </a>
      </div>
    </div>
  );
};

LandingDesktop.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(LandingDesktop);
