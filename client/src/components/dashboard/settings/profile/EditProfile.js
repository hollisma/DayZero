import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../../../actions/profile";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const EditProfile = ({
  profile: { profile, loading: profile_loading },
  auth: { user, loading: user_loading },
  createProfile,
  getCurrentProfile
}) => {
  const [formData, setFormData] = useState({
    college: "",
    major: "",
    minor: "",
    categories: "",
    bio: "",
    want_to_meet: "",
    phone_number: "",
    sms: true,
    email: false
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      name: user_loading || !user || !user.name ? "" : user.name,
      email: user_loading || !user || !user.email ? "" : user.email,
      college:
        profile_loading || !profile || !profile.college ? "" : profile.college,
      major:
        profile_loading || !profile || !profile.major
          ? ""
          : profile.major.join(", "),
      minor:
        profile_loading || !profile || !profile.minor
          ? ""
          : profile.minor.join(", "),
      categories:
        profile_loading || !profile || !profile.categories
          ? ""
          : profile.categories.join(", "),
      bio: profile_loading || !profile || !profile.bio ? "" : profile.bio,
      want_to_meet:
        profile_loading || !profile || !profile.want_to_meet
          ? ""
          : profile.want_to_meet,
      phone_number:
        user_loading || !user || !user.phone_number ? "" : user.phone_number,
      comm_sms: user_loading || !user || !user.comm_sms ? false : user.comm_sms,
      comm_email:
        user_loading || !user || !user.comm_email ? false : user.comm_email
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile_loading, user_loading, getCurrentProfile]);

  const {
    name,
    email,
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
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    setFormData({ ...formData, [name]: value });
  };

  const onPhoneChange = e => {
    setFormData({ ...formData, phone_number: e });
  };

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, true);
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
        <p>* Name</p>
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
        <p>Email (cannot change)</p>
        <div className="field">
          <input
            type="text"
            placeholder="email"
            name="email"
            value={email}
            disabled
            required
          />
        </div>
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

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
