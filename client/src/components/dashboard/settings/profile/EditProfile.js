import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../../../actions/profile";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    college: "",
    major: "",
    minor: "",
    categories: "",
    bio: "",
    values: "",
    phone_number: "",
    sms: true,
    email: false
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      college: loading || !profile || !profile.college ? "" : profile.college,
      major:
        loading || !profile || !profile.major ? "" : profile.major.join(", "),
      minor:
        loading || !profile || !profile.minor ? "" : profile.minor.join(", "),
      categories:
        loading || !profile || !profile.categories
          ? ""
          : profile.categories.join(", "),
      bio: loading || !profile || !profile.bio ? "" : profile.bio,
      values:
        loading || !profile || !profile.values ? "" : profile.values.join(", "),
      phone_number:
        loading || !profile || !profile.phone_number
          ? ""
          : profile.phone_number,
      sms: loading || !profile || !profile.sms ? false : profile.sms,
      email: loading || !profile || !profile.email ? false : profile.email
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, getCurrentProfile]);

  const {
    college,
    major,
    minor,
    categories,
    bio,
    values,
    phone_number,
    sms,
    email
  } = formData;

  const onChange = e => {
    const target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    setFormData({ ...formData, [name]: value });
  };

  const onPhoneChange = e => {
    setFormData({ ...formData, phone_number: e });
  };

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <div className="ui top-container">
      <h1 className="larger text-primary">Edit Your Profile</h1>
      <p className="lead my-up-1">
        <i className="fas fa-user" />
        Tell us about yourself!
      </p>
      <small>* = required field</small>
      <form className="ui form" onSubmit={e => onSubmit(e)}>
        <p>College *</p>
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
        <p>Major *</p>
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
        <p>Minor</p>
        <div className="field">
          <input
            type="text"
            placeholder="Minor"
            name="minor"
            value={minor}
            onChange={e => onChange(e)}
          />
        </div>
        <p>Categories you're interested in</p>
        <div className="field">
          <input
            type="text"
            placeholder="Categories"
            name="categories"
            value={categories}
            onChange={e => onChange(e)}
          />
        </div>
        <p>Tell us a little about yourself</p>
        <div className="field">
          <input
            type="text"
            placeholder="Bio"
            name="bio"
            value={bio}
            onChange={e => onChange(e)}
          />
        </div>
        <p>Values</p>
        <div className="field">
          <input
            type="text"
            placeholder="Values"
            name="values"
            value={values}
            onChange={e => onChange(e)}
          />
        </div>
        <p>Phone Number</p>
        <PhoneInput
          placeholder="Enter phone number"
          country="US"
          value={phone_number}
          onChange={e => onPhoneChange(e)}
        />
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
        <div className="ui field toggle checkbox mx-2 my">
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
    </div>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
