import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateUser, createProfile } from "../../actions/profile";
// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";
import { CATEGORIES } from "../../utils/consts";
import AvatarEdit from "react-avatar-edit";
import Avatar from "react-avatar";

const CreateProfile = ({
  auth: { user, loading },
  updateUser,
  createProfile
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
    // college: "",
    year: "",
    major: "",
    // minor: "",
    categories: []
    // bio: "",
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
    // college,
    year,
    major,
    // minor,
    categories
    // bio,
    // want_to_meet,
    // phone_number,
    // comm_sms,
    // comm_email
  } = formData;

  const onChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if (name === "bio" && value.length > 400) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // const onPhoneChange = e => {
  //   setFormData({ ...formData, phone_number: e });
  // };

  const onSubmit = e => {
    e.preventDefault();

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
      // minor,
      categories
      // bio
      // want_to_meet
    };

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
        style={{ margin: "5px" }}
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
      <h1>Create Your Profile</h1>
      <p className="lead my-2">
        <i className="fas fa-user" />
        Tell us about yourself!
      </p>
      <small>* = required field</small>
      <form className="ui form equal width grid" onSubmit={e => onSubmit(e)}>
        <div className="row">
          <div className="column">
            <p>Current Profile Picture</p>
            <Avatar
              className="avatar"
              size="100"
              round
              src={user && user.avatar}
            />
          </div>
          <div className="column">
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
            <p>* Class</p>
            <div className="field">
              <input
                type="text"
                placeholder="2023"
                name="year"
                value={year}
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
          </div>
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
          <div className="column">
            <p>
              What topics do you enjoy talking about or want to learn more
              about?
            </p>
            <div className="field">{categoryButtons}</div>
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
                maxLength="400"
              />
            </div>
          </div>
        </div> */}
        {/* <div className="row">
          <div className="column">
            <p>
              In 2-4 sentences, tell us about your hobbies, internships, and
              interests. This will be shown to your matches for them to know you
              better.
            </p>
            <div className="field">
              <textarea
                className="big-input"
                placeholder="I co-founded a national entrepreneurship publication that 
                interviews entrepreneurs called Profiles In Entrepreneurship. This past 
                summer I worked at an AI-focused venture capital firm in China, where I 
                met some of China's top entrepreneurs and learned a lot about the Chinese 
                entrepreneurial ecosystem. In my free time I also build websites, play 
                basketball, and enjoy talking about religion and philosophy. I'm also 
                working on a startup a called Day Zero to help college students meet 
                like-minded and interesting people."
                name="bio"
                value={bio}
                onChange={e => onChange(e)}
                rows="4"
              />
            </div>
          </div>
        </div> */}
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
          <p>
            By clicking submit, you agree to accept our{" "}
            {
              <a href="https://drive.google.com/file/d/1qv_2QlRe09NeJ1LjRoryaSPxpDuHjMIh/view?usp=sharing">
                Terms and Conditions
              </a>
            }
          </p>
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
