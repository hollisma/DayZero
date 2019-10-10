import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import ExampleProfile from "../profile/ExampleProfile";
import GFLogin from "../auth/GFLogins";

import "../auth/auth.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Section1 = ({ register, isAuthenticated }) => {
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
    if (!name) {
      MySwal.fire({
        title: "Please enter your name",
        type: "error"
      });
    } else if (!email) {
      MySwal.fire({
        title: "Please enter your email",
        type: "error"
      });
    } else if (!isSchoolEmail(email)) {
      MySwal.fire({
        title:
          "Please enter your school email (@princeton.edu or @stanford.edu)",
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
    let validExtensions = ["princeton.edu", "stanford.edu"];

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
    <div id="section1" className="ui bigger-top-container">
      <div className="left-container">
        <h3 id="tagline">Sixty seconds to register.</h3>
        <h3 id="tagline">Meet Princeton students who share your passions.</h3>
        <ExampleProfile firstName="carina" />
        <ExampleProfile firstName="dan" />
      </div>
      <div className="right-container">
        {/* <p className="available">Only available at:</p>
        <div className="images">
          <img
            src={require("../../img/stanford.svg")}
            className="stanford"
            alt="stanford logo"
          />
          <img
            src={require("../../img/princeton.svg")}
            className="princeton"
            alt="princeton logo"
          />
        </div> */}
        <p className="call_to_action">
          <i className="fas fa-user" /> Signing up takes 60 seconds
        </p>
        {/* <GFLogin /> */}

        <form className="ui form" onSubmit={e => onSubmit(e)}>
          <div className="field">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="field">
            <input
              type="email"
              placeholder="Email Address"
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
          <input type="submit" className="ui button my-1" value="Register" />
        </form>
        <p className="already">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

Section1.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { register }
)(Section1);
