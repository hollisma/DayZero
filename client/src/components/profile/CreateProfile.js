import React, { useState, Fragment } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";
import { createSchedule } from "../../actions/schedule";

const CreateProfile = ({ createProfile, createSchedule }) => {
  const [formData, setFormData] = useState({
    college: "",
    major: "",
    minor: "",
    categories: "",
    bio: "",
    values: "",
    sms: true,
    email: false
  });

  const {
    college,
    major,
    minor,
    categories,
    bio,
    values,
    sms,
    email
  } = formData;

  const onChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData);
  };

  return (
    <Fragment>
      <h1 className="larger text-primary">Create Your Profile</h1>
      <p className="lead my-2">
        <i className="fas fa-user" />
        Tell us about yourself!
      </p>
      <small>* = required field</small>
      <form className="ui form" onSubmit={e => onSubmit(e)}>
        <div className="field">
          <input
            type="text"
            placeholder="College"
            name="college"
            value={college}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="field">
          <input
            type="text"
            placeholder="Major"
            name="major"
            value={major}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="field">
          <input
            type="text"
            placeholder="Minor"
            name="minor"
            value={minor}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="field">
          <input
            type="text"
            placeholder="Categories"
            name="categories"
            value={categories}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="field">
          <input
            type="text"
            placeholder="Bio"
            name="bio"
            value={bio}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="field">
          <input
            type="text"
            placeholder="Values"
            name="values"
            value={values}
            onChange={e => onChange(e)}
          />
        </div>
        <p>Communication Preference</p>
        <div className="ui field toggle checkbox">
          <input
            type="checkbox"
            name="sms"
            checked={sms}
            onChange={e => onChange(e)}
          />
          <label>SMS</label>
        </div>
        <div className="ui field toggle checkbox m-2">
          <input
            type="checkbox"
            name="email"
            checked={email}
            onChange={e => onChange(e)}
          />
          <label>Email</label>
        </div>

        <a href="/" className="ui red basic button m-1 right floated">
          Go back
        </a>
        <input
          type="submit"
          className="ui green basic button my-1 right floated"
        />
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  createSchedule: PropTypes.func.isRequired
};

export default connect(
  null,
  { createProfile, createSchedule }
)(withRouter(CreateProfile));
