import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";
import { getDefaultRoute } from "../routing/default_types";
import { GUEST } from "../../utils/consts";
import ExampleProfile from "../profile/ExampleProfile";
// import GFLogin from "./GFLogins";

import "./auth.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Login = ({ login, auth: { isAuthenticated, user } }) => {
  const [formData, setFromData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFromData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (!email) {
      MySwal.fire({
        title: "Please enter your email",
        type: "error"
      });
    } else if (!password) {
      MySwal.fire({
        title: "Please enter your password",
        type: "error"
      });
    } else {
      login(email, password);
    }
  };

  if (isAuthenticated) {
    const userType = user ? user.user_type : GUEST;
    return <Redirect to={getDefaultRoute(userType)} />;
  }

  return (
    <div id="section1" className="ui bigger-top-container">
      <div className="upper-container">
        <h3 id="tagline">
          <span className="underline">Thirty seconds</span> to register.
        </h3>
        <h3 id="tagline">
          Meet Princeton students who
          <span className="underline"> share your passions.</span>
        </h3>
      </div>
      <div className="bottom-container">
        <div className="left-container">
          <ExampleProfile firstName="carina" />
          <ExampleProfile firstName="dan" />
        </div>
        <div className="right-container">
          <p className="lead my-2">
            <i className="fas fa-user" /> Sign Into Your Account
          </p>
          {/* <GFLogin /> */}
          <form className="ui form" onSubmit={e => onSubmit(e)}>
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
            <input type="submit" className="ui button my-1" value="Login" />
          </form>
          <p className="my-1">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { login })(Login);
