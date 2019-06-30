import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: ""
  });

  const { name, email, password, phone_number } = formData;

  const onChange = e =>
    setFromData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
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
            required
          />
        </div>
        <div className="field">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
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
            minLength="6"
          />
        </div>
        <input type="submit" className="ui button" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;
