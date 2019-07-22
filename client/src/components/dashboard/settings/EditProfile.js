import React, { useState, Fragment, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../../actions/profile";

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
    contact: ""
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
      contact: loading || !profile || !profile.contact ? "" : profile.contact
    });
  }, [loading, getCurrentProfile]);

  const { college, major, minor, categories, bio, values, contact } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className="larger text-primary">Edit Your Profile</h1>
      <p className="lead my-2">
        <i className="fas fa-user" />
        Tell us about yourself!
      </p>
      <small>* = required field</small>
      <form className="ui form" onSubmit={e => onSubmit(e)}>
        <p>College</p>
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
        <p>College</p>
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
        <p>College</p>
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
        <div className="field">
          <input
            type="text"
            placeholder="Values"
            name="contact"
            value={contact}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="ui button my-1" />
        <button className="ui button m-1" onClick={() => history.goBack()}>
          Go Back
        </button>
      </form>
    </Fragment>
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
