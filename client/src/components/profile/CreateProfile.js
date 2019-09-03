import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateUser, createProfile } from "../../actions/profile";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const CreateProfile = ({
  auth: { user, loading },
  updateUser,
  createProfile
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    major: "",
    minor: "",
    categories: "",
    bio: "",
    values: "",
    phone_number: "",
    comm_sms: true,
    comm_email: false
  });

  useEffect(() => {
    setFormData({
      ...formData,
      name: loading || !user || !user.name ? "" : user.name,
      email: loading || !user || !user.email ? "" : user.email
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const {
    college,
    major,
    minor,
    categories,
    bio,
    want_to_meet,
    phone_number,
    comm_sms,
    comm_email
  } = formData;

  const onChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setFormData({ ...formData, [name]: value });
  };

  const onPhoneChange = e => {
    setFormData({ ...formData, phone_number: e });
  };

  const onSubmit = e => {
    e.preventDefault();

    let userData = {
      name: formData.name,
      email: formData.email,
      phone_number,
      comm_sms,
      comm_email
    };
    let profileData = { college, major, minor, categories, bio, want_to_meet };

    updateUser(userData);
    createProfile(profileData);
  };

  return (
    <div className="ui top-container">
      <h1 className="larger text-primary">Create Your Profile</h1>
      <p className="lead my-2">
        <i className="fas fa-user" />
        Tell us about yourself!
      </p>
      <small>* = required field</small>
      <form className="ui form" onSubmit={e => onSubmit(e)}>
        <p>* College</p>
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
        <p>* Major</p>
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
        <p>
          Tell us a little about yourself: hobbies, interests, work, anything!
        </p>
        <div className="field">
          <input
            type="text"
            placeholder="Bio"
            name="bio"
            value={bio}
            onChange={e => onChange(e)}
          />
        </div>
        <p>
          In a couple sentences, describe the type of people you want to meet
        </p>
        <div className="field">
          <input
            type="text"
            placeholder="I want to meet people who are yada yada yada"
            name="want_to_meet"
            value={want_to_meet}
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
            name="comm_sms"
            checked={comm_sms}
            onChange={e => onChange(e)}
          />
          <label>Text</label>
        </div>
        <div className="ui field toggle checkbox mx-2 my">
          <input
            type="checkbox"
            name="comm_email"
            checked={comm_email}
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

CreateProfile.propTypes = {
  updateUser: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { updateUser, createProfile }
)(withRouter(CreateProfile));
