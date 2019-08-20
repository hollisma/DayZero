import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import ExampleProfile from "../profile/ExampleProfile";
import GFLogin from "./GFLogins";

import "./auth.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFromData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: ""
  });

  const { name, email, phone_number, password } = formData;

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
    } else if (password.length < 6) {
      MySwal.fire({
        title: "Password must be at least 6 characters",
        type: "error"
      });
    } else {
      register({ name, email, phone_number, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="dashboard" />;
  }

  return (
    <div className="ui top-container bigger-top-container">
      <div className="left-container">
        <h3>Sixty seconds to signup</h3>
        <h3>Grab meals with people who share your passions</h3>
        <ExampleProfile fileName="max_kim.png" />
        <ExampleProfile fileName="max_kim.png" />
      </div>
      <div className="right-container">
        <GFLogin />
        <h1 className="larger text-primary">Sign Up</h1>
        <p className="lead my-2">
          <i className="fas fa-user" /> Create Your Account
        </p>
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
              type="text"
              placeholder="Phone Number"
              name="phone_number"
              value={phone_number}
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
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { register }
)(Register);
