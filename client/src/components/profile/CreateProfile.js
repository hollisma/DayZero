import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateUser, createProfile } from "../../actions/profile";
import { logout } from "../../actions/auth";
// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";
import { CATEGORIES, MAJORS, MINORS } from "../../utils/consts";
import AvatarEdit from "react-avatar-edit";
import Avatar from "react-avatar";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactGA from "react-ga";

import { Dropdown } from 'semantic-ui-react'
import './EditProfile.css';

const MySwal = withReactContent(Swal);

ReactGA.initialize("UA-149452731-1");
ReactGA.pageview(window.location.pathname + window.location.search);

const CreateProfile = ({
  auth: { user, loading },
  updateUser,
  logout,
  createProfile
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
    // college: "",
    year: "",
    major: "",
    minor: [],
    categories: [],
    bio: "",
    // want_to_meet: "",
    // phone_number: "",
    // comm_sms: true,
    // comm_email: false
  });

  useEffect(() => {
    setFormData({
      ...formData,
      name: loading || !user || !user.name ? "" : user.name,
      email: loading || !user || !user.email ? "" : user.email,
      avatar: loading || !user || !user.avatar ? "" : user.avatar
      // college:
      //   loading || !user || !user.email
      //     ? ""
      //     : user.email.split("@")[1] === "princeton.edu"
      //     ? "Princeton University"
      //     : "Stanford University"
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const {
    avatar,
    name,
    // college,
    year,
    major,
    minor,
    categories,
    bio,
    // want_to_meet,
    // phone_number,
    // comm_sms,
    // comm_email
  } = formData;

  // const onPhoneChange = e => {
  //   setFormData({ ...formData, phone_number: e });
  // };

  const onSubmit = e => {
    e.preventDefault();

    if (!formData.name) {
      MySwal.fire({
        title: "Please enter your name",
        type: "error"
      });
    }

    let userData = {
      name: formData.name,
      email: formData.email,
      avatar
      // phone_number,
      // comm_sms,
      // comm_email
    };
    let profileData = {
      // college,
      year,
      major,
      minor,
      categories,
      bio,
      // want_to_meet
    };

    ReactGA.ga("send", "event", "profile", "create", "first", 0);
    updateUser(userData);
    createProfile(profileData);
  };

  const categoryButtons = CATEGORIES.map(cat => {
    return (
      <button
        className={
          "ui blue button category-button " +
          (categories.includes(cat) ? "" : "basic")
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

  const onChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if (name === "bio" && value.length > 400) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const onDropdownChange = (_, val) => {
    const value = val.value
    const name = val.name
    setFormData({ ...formData, [name]: value })
  }

  const classOptions = ['2024', '2023', '2022', '2021', 'Grad'].map(year => (
    { key: year, text: year, value: year }
  ))

  const majorOptions = MAJORS.map(m => (
    { key: m[0], text: m[1], value: m[0] }
  ))

  const minorOptions = MINORS.map(m => (
    { key: m, text: m, value: m }
  ))

  return (
    <div className="create-profile ui top-container">
      <h1>Create Your Profile</h1>
      <p className="lead my-2">
        <i className="fas fa-user" />
        Tell us about yourself!
      </p>
      <form className="ui form equal width grid" onSubmit={e => onSubmit(e)}>
        <div className="row">
          <div className="column">
            <div className="row left-fields">
              <p>Full Name*</p>
              <div className="field">
                <input
                  type="text"
                  placeholder="Chris Eisgruber"
                  name="name"
                  value={name}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
            </div>
            {/* <div className="row triple-input"> */}
              <div className="row left-fields">
              {/* <div className="column right-pad"> */}
                <p>Class*</p>
                <div className="field">
                  <Dropdown 
                    placeholder='Class' 
                    selection 
                    name='year' 
                    options={classOptions} 
                    onChange={onDropdownChange} 
                    value={year} 
                  />
                </div>
              </div>
              <div className="row left-fields">
              {/* <div className="column right-pad"> */}
                <p>Major*</p>
                <div className="field">
                  <Dropdown 
                    placeholder='Major' 
                    selection search
                    name='major' 
                    options={majorOptions} 
                    onChange={onDropdownChange} 
                    value={major} 
                  />
                </div>
              </div>
              <div className="row left-fields">
              {/* <div className="column pad"> */}
                <p>Minor(s)</p>
                <div className="field">
                  <Dropdown 
                    placeholder='Minor' 
                    selection search multiple fluid
                    name='minor' 
                    options={minorOptions} 
                    onChange={onDropdownChange} 
                    value={minor} 
                  />
                </div>
              </div>
            {/* </div> */}
          </div>
          <div className="column avataredit" style={{ display: "flex" }}>
            <div style={{ margin: "2vw 4vw" }}>
              <p>Current Profile Picture</p>
              <Avatar
                className="avatar"
                size="100"
                round
                src={user && user.avatar}
              />
            </div>
            <div style={{ margin: "2vw 4vw" }}>
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
          {/* <div className="column">
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
          </div> */}
        </div>
        <div className="row">
          <div className="column avataredit2" style={{ display: "flex" }}>
            <div style={{ margin: "2vw 4vw" }}>
              <p>Current Profile Picture</p>
              <Avatar
                className="avatar"
                size="100"
                round
                src={user && user.avatar}
              />
            </div>
            <div style={{ margin: "2vw 4vw" }}>
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
        </div>
        <div className="row">
          <div className="column">
            <p>
              <b>Which phrases describe you or future you?</b>
            </p>
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
                and learned about the different textures, flavors, and smells of cheese.
                Next year, I'll be starting my own restaurant to pursue my passion for cheese fondue."
                name="bio"
                value={bio}
                onChange={e => onChange(e)}
                rows="4"
              />
            </div>
          </div>
        </div>
        {/* <div className="column">
          <p>* Phone Number</p>
          <PhoneInput
            placeholder="Enter phone number"
            country="US"
            value={phone_number}
            onChange={e => onPhoneChange(e)}
            required
          />
        </div> */}
        {/* <div className="column">
          <p>How should we notify you when you've been matched?</p>
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
          {/* <p>
            By clicking submit, you agree to accept our{" "}
            {
              <a href="https://drive.google.com/file/d/1qv_2QlRe09NeJ1LjRoryaSPxpDuHjMIh/view?usp=sharing">
                Terms and Conditions
              </a>
            }
          </p> */}
          <Link to='/' onClick={logout} className="ui red basic button m-1 right floated">
            Go back
          </Link>
          <input
            type="submit"
            className="ui green basic button my-1 right floated"
          />
        </div>
      </form>
    </div>
  );
};

CreateProfile.propTypes = {
  updateUser: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { updateUser, createProfile, logout })(
  withRouter(CreateProfile)
);
