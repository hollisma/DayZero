import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getDisplayProfile,
  getUserProfile,
  getRandomProfiles
} from "../../actions/profile";
import Avatar from "react-avatar";

import "./ProfilePage.css";

// Need to get user data
const ProfilePage = ({
  user_id,
  profile: { display_profile, display_loading },
  getDisplayProfile,
  getUserProfile,
  getRandomProfiles
}) => {
  var [profileData, setProfileData] = useState({
    name: "",
    email: "",
    avatar: "",
    college: "",
    year: "",
    major: "",
    minor: "",
    categories: [],
    bio: ""
  });

  var [randomProfiles, setRandomProfiles] = useState([]);

  useEffect(() => {
    getDisplayProfile(user_id);

    setProfileData({
      name:
        display_loading ||
        !display_profile ||
        !display_profile.user ||
        !display_profile.user.name
          ? ""
          : display_profile.user.name,
      email:
        display_loading ||
        !display_profile ||
        !display_profile.user ||
        !display_profile.user.email
          ? ""
          : display_profile.user.email,
      avatar:
        display_loading ||
        !display_profile ||
        !display_profile.user ||
        !display_profile.user.avatar
          ? ""
          : display_profile.user.avatar,
      college:
        display_loading || !display_profile || !display_profile.college
          ? ""
          : display_profile.college,
      year:
        display_loading || !display_profile || !display_profile.year
          ? ""
          : display_profile.year,
      major:
        display_loading || !display_profile || !display_profile.major
          ? ""
          : display_profile.major.join(", "),
      minor:
        display_loading || !display_profile || !display_profile.minor
          ? ""
          : display_profile.minor.join(", "),
      categories:
        display_loading || !display_profile || !display_profile.categories
          ? []
          : display_profile.categories,
      bio:
        display_loading || !display_profile || !display_profile.bio
          ? ""
          : display_profile.bio
    });

    // getRandomProfiles could be optimized. rn it gets all profiles then randomly chooses 4
    getRandomProfiles(4).then(res => {
      setRandomProfiles(res);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDisplayProfile, user_id, display_loading, getRandomProfiles]);

  const randomProfilesComponent = (
    <Fragment>
      {randomProfiles &&
        randomProfiles.map(profile => (
          <a
            style={{
              marginBottom: "1.5rem"
            }}
            href={profile && profile.user && profile.user._id}
          >
            <div className="similar-person">
              <Avatar
                className="avatar"
                size="100"
                round
                src={profile && profile.user && profile.user.avatar}
              />
              <div className="name">
                {profile && profile.user && profile.user.name}
              </div>
            </div>
          </a>
        ))}
    </Fragment>
  );

  return (
    <div id="profile-page">
      <div className="left">
        <div className="info">
          <Avatar
            className="avatar"
            size="125"
            round
            src={profileData.avatar}
          />
          <div className="basic-info">
            <div className="name">{profileData.name}</div>
            <div className="bio">{profileData.major}</div>
          </div>
        </div>
        <div className="about-section">
          <div className="about-header">
            About {profileData.name.split(" ")[0]}
          </div>
          <div className="about-paragraph">{profileData.bio}</div>
        </div>
      </div>
      <div className="right">
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Similar People
        </h2>
        <div className="also-viewed">{randomProfilesComponent}</div>
      </div>
    </div>
  );
};

ProfilePage.propTypes = {
  getDisplayProfile: PropTypes.func.isRequired,
  getUserProfile: PropTypes.func.isRequired,
  getRandomProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getDisplayProfile, getUserProfile, getRandomProfiles }
)(ProfilePage);
