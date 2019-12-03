import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";
import { getDefaultRoute } from "../routing/default_types";
import { GUEST } from "../../utils/consts";

import "./Login.css";

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
    <div id="login">
      <div className="thirty">Meet your Day Zeros!</div>
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
        <input type="submit" className="sign-up-button" value="Login" />
      </form>
      <p className="already">
        Don't have an account?{" "}
        <Link to="/#footer-desktop" className="alatsi">
          Register
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
