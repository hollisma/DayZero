import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  updateUser,
  createProfile,
  getCurrentProfile
} from "../../../../actions/profile";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const allCategories = ["Technology", "Startups", "Food"];

const EditProfile = ({
  profile: { profile, loading: profile_loading },
  auth: { user, loading: user_loading },
  updateUser,
  createProfile,
  getCurrentProfile
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    major: "",
    minor: "",
    categories: [],
    bio: "",
    want_to_meet: "",
    phone_number: "",
    comm_sms: true,
    comm_email: false
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
          ? []
          : profile.categories,
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

    let userData = { name, email, phone_number, comm_sms, comm_email };
    let profileData = { college, major, minor, categories, bio, want_to_meet };

    updateUser(userData);
    createProfile(profileData, true);
  };

  const categoryButtons = allCategories.map(cat => {
    return (
      <button
        className={"ui green button " + (!categories.includes(cat) && "basic")}
        onClick={e => {
          e.preventDefault();
          if (categories.includes(cat)) {
            let temp = categories;
            temp.splice(categories.indexOf(cat), 1);
            setFormData({
              ...formData,
              categories: temp
            });
          } else {
            let temp = categories;
            temp.push(cat);
            setFormData({
              ...formData,
              categories: temp
            });
          }
        }}
        key={cat}
      >
        {cat}
      </button>
    );
  });

  return (
    <div className="ui top-container">
      <h1 className="larger text-primary">Edit Your Profile</h1>
      <p className="lead my-up-1">
        <i className="fas fa-user" />
        Tell us about yourself!
      </p>
      <small>* = required field</small>
      <form className="ui form equal width grid" onSubmit={e => onSubmit(e)}>
        <div className="row">
          <div className="column">
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
          </div>
          <div className="column">
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
          </div>
        </div>
        <div className="row">
          <div className="column">
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
          </div>
          <div className="column">
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
          </div>
          <div className="column">
            <p>Minor (separate by commas)</p>
            <div className="field">
              <input
                type="text"
                placeholder="Minor"
                name="minor"
                value={minor}
                onChange={e => onChange(e)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <p>Categories you're interested in</p>
            <div className="field">{categoryButtons}</div>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <p>
              Tell us a little about yourself: hobbies, interests, work,
              anything!
            </p>
            <div className="field">
              <textarea
                className="big-input"
                placeholder="Bio"
                name="bio"
                value={bio}
                onChange={e => onChange(e)}
                rows="4"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <p>
              In a couple sentences, describe the type of people you want to
              meet
            </p>
            <div className="field">
              <textarea
                className="big-input"
                placeholder="I want to meet people who are yada yada yada"
                name="want_to_meet"
                value={want_to_meet}
                onChange={e => onChange(e)}
                rows="4"
              />
            </div>
          </div>
        </div>
        <div className="column">
          <p>Phone Number</p>
          <PhoneInput
            placeholder="Enter phone number"
            country="US"
            value={phone_number}
            onChange={e => onPhoneChange(e)}
          />
        </div>
        <div className="column">
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
        </div>

        <div className="column">
          <a href="/" className="ui red basic button m-1 right floated">
            Go back
          </a>
          <input
            type="submit"
            className="ui green basic button my-1 right floated"
          />
        </div>
      </form>
    </div>
  );
};

EditProfile.propTypes = {
  updateUser: PropTypes.func.isRequired,
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
  { updateUser, createProfile, getCurrentProfile }
)(withRouter(EditProfile));
