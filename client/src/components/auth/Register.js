import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFromData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    password2: ""
  });

  const { name, email, phone_number, password, password2 } = formData;

  const onChange = e =>
    setFromData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      MySwal.fire({ title: "Passwords do not match", type: "error" });
    } else {
      register({ name, email, phone_number, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="x-large text-primary">Sign Up</h1>
      <p className="large my-3">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="ui form" onSubmit={e => onSubmit(e)}>
        <div className="field lead">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="field lead">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="field lead">
          <input
            type="text"
            placeholder="Phone Number"
            name="phone_number"
            value={phone_number}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="field lead">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        <div className="field lead">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="ui button lead my-2" value="Register" />
      </form>
      <p className="my-1 lead">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
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
