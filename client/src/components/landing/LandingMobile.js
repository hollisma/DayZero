import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

import "./LandingMobile.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const LandingMobile = ({ register, isAuthenticated }) => {
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

    return false;
  };

  if (isAuthenticated) {
    return <Redirect to="dashboard" />;
  }

  return (
    <div id="landing-mobile" className="ui bigger-top-container">
      <div className="top">
        <div className="big-text">
          Discover Princetonians who share your passions.
        </div>
        <div className="small-text">
          Day Zero is the only platform for meeting like-minded people offline.
        </div>
        <a href="/#footer-mobile" className="sign-up-button">
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
          and grab meals with the people you've never met that share your
          passions and values.
        </div>
        <div className="card-profile">
          <img
            src={require("../../img/carina_rec.svg")}
            alt="Carina"
            className="card-pic"
          />
          <div className="text">
            "Day Zero made it easy for me to find other people passionate about
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
      </div>
      <div id="footer-mobile">
        <div className="thirty">Only thirty seconds to register!</div>
        <form className="ui form login-stuff" onSubmit={e => onSubmit(e)}>
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

LandingMobile.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(LandingMobile);
