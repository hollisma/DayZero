import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  updateUser,
  createProfile,
  getCurrentProfile
} from "../../actions/profile";
// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";
import { CATEGORIES } from "../../utils/consts";
import AvatarEdit from "react-avatar-edit";
import Avatar from "react-avatar";

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
    avatar: "",
    college: "",
    year: "",
    major: "",
    minor: "",
    categories: [],
    bio: ""
    // want_to_meet: "",
    // phone_number: "",
    // comm_sms: true,
    // comm_email: false
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      name: user_loading || !user || !user.name ? "" : user.name,
      email: user_loading || !user || !user.email ? "" : user.email,
      avatar: user_loading || !user || !user.avatar ? "" : user.avatar,
      college:
        profile_loading || !profile || !profile.college ? "" : profile.college,
      year: profile_loading || !profile || !profile.year ? "" : profile.year,
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
      bio: profile_loading || !profile || !profile.bio ? "" : profile.bio
      // want_to_meet:
      //   profile_loading || !profile || !profile.want_to_meet
      //     ? ""
      //     : profile.want_to_meet,
      // phone_number:
      //   user_loading || !user || !user.phone_number ? "" : user.phone_number,
      // comm_sms: user_loading || !user || !user.comm_sms ? false : user.comm_sms,
      // comm_email:
      //   user_loading || !user || !user.comm_email ? false : user.comm_email
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile_loading, user_loading, getCurrentProfile]);

  const {
    name,
    email,
    avatar,
    college,
    year,
    major,
    minor,
    categories,
    bio
    // want_to_meet,
    // phone_number,
    // comm_sms,
    // comm_email
  } = formData;

  const onChange = e => {
    const target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    if ((name === "bio" || name === "want_to_meet") && value.length > 400) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // const onPhoneChange = e => {
  //   setFormData({ ...formData, phone_number: e });
  // };

  const onSubmit = e => {
    e.preventDefault();

    // let userData = { name, email, avatar, phone_number, comm_sms, comm_email };
    let userData = { name, email, avatar };
    let profileData = {
      college,
      year,
      major,
      minor,
      categories,
      bio
      // want_to_meet
    };

    updateUser(userData);
    createProfile(profileData, true);
  };

  const categoryButtons = CATEGORIES.map(cat => {
    return (
      <button
        className={
          "ui blue button category-button " +
          (categories.includes(cat) ? "" : "not-selected")
        }
        style={{ margin: "5px", fontWeight: "bold" }}
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
    <div id="edit-profile" className="ui container">
      <h1 className="edit-profile-header">
        Edit Your Profile
        <button className='ui green button my-1 right floated' onClick={onSubmit}>Save</button>
      </h1>
      <p className="lead my-up-1">
        <i className="fas fa-user" /> What would you like people to know about
        you?
      </p>
      <small></small>
      <form className="ui form equal width grid" onSubmit={e => onSubmit(e)}>
        <div className="row">
          <div className="column">
            <p className='edit-profile-labels'>Name</p>
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
            <p className='edit-profile-labels'>Email (cannot change)</p>
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
          <div className="column avataredit">
            <p>Current Profile Picture</p>
            <Avatar
              className="avatar"
              size="100"
              round
              src={user && user.avatar}
            />
            <button
              style={{ margin: "20px" }}
              className="ui button"
              onClick={e => {
                setFormData({
                  ...formData,
                  avatar: "https://i.stack.imgur.com/dr5qp.jpg"
                });
              }}
            >
              Reset
            </button>
          </div>
          <div className="column avataredit">
            <AvatarEdit
              width={200}
              height={150}
              onCrop={pic => {
                setFormData({
                  ...formData,
                  avatar: pic
                });
              }}
              onClose={() => {
                setFormData({
                  ...formData,
                  avatar: user && user.avatar
                });
              }}
              src={avatar}
            />
          </div>
        </div>
        <div className="row">
          <div className="column avataredit1">
            <p>Current Profile Picture</p>
            <Avatar
              className="avatar"
              size="100"
              round
              src={user && user.avatar}
            />
            <button
              style={{ margin: "20px" }}
              className="ui button"
              onClick={e => {
                setFormData({
                  ...formData,
                  avatar: "https://i.stack.imgur.com/dr5qp.jpg"
                });
              }}
            >
              Reset
            </button>
          </div>
          <div className="column avataredit2">
            <AvatarEdit
              width={130}
              height={175}
              onCrop={pic => {
                setFormData({
                  ...formData,
                  avatar: pic
                });
              }}
              onClose={() => {
                setFormData({
                  ...formData,
                  avatar: user && user.avatar
                });
              }}
              src={avatar}
            />
          </div>
        </div>
        <div className="row">
          {/* <div className="column">
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
          </div> */}
          <div className="column">
            <p className='edit-profile-labels'>Class</p>
            <div className="field">
              <input
                type="text"
                placeholder="2021"
                name="year"
                value={year}
                onChange={e => onChange(e)}
                required
              />
            </div>
          </div>
          <div className="column">
            <p className='edit-profile-labels'>Major</p>
            <div className="field">
              <input
                type="text"
                placeholder="COS"
                name="major"
                value={major}
                onChange={e => onChange(e)}
                required
              />
            </div>
          </div>
          <div className="column">
            <p className='edit-profile-labels'>Minor(s)</p>
            <div className="field">
              <input
                type="text"
                placeholder="B flat"
                name="minor"
                value={minor}
                onChange={e => onChange(e)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <p>Which words or phrases describe you?</p>
            <div className="field">{categoryButtons}</div>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <p>Tell us about yourself!</p>
            <div className="field">
              <textarea
                className="big-input"
                placeholder="I am a huge cheese fondue fan. Over the past summer,
                I interned in Zurich where I made and served cheese fondue to customers,
                and learned so much about the different textures, flavors, and smells of cheese.
                Next year, I'll be starting my own restaurant to pursue my passion for cheese fondue."
                name="bio"
                value={bio}
                onChange={e => onChange(e)}
                rows="4"
              />
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className="column">
            <p>
              In 2-3 sentences, describe the type of person you want to meet
              through Day Zero. This will be shown to your matches for them to
              know you better.
            </p>
            <div className="field">
              <textarea
                className="big-input"
                placeholder="I want to meet people who are deeply optimistic and passionate 
                about their work, whether it be entrepreneurship, music, physics, 
                volunteering, or anything else. I approach my passions with a hunger and 
                want to be inspired by similar people who share that drive to become 
                great. I appreciate people who are thoughtful and willing to challenge
                their own beliefs."
                name="want_to_meet"
                value={want_to_meet}
                onChange={e => onChange(e)}
                rows="4"
              />
            </div>
          </div>
        </div> */}
        {/* <div className="column">
          <p>Phone Number</p>
          <PhoneInput
            placeholder="Enter phone number"
            country="US"
            value={phone_number}
            onChange={e => onPhoneChange(e)}
          />
        </div> */}
        {/* <div className="column">
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
        </div> */}

        <div className="column">
          {/* <a href="/" className="ui red basic button m-1 right floated">
            Go back
          </a> */}
          <input
            type="submit"
            value="Save"
            className="ui green button my-1 right floated"
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
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {
  updateUser,
  createProfile,
  getCurrentProfile
})(withRouter(EditProfile));
