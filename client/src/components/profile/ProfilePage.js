import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getDisplayProfile,
  getUserProfile,
  getRandomProfiles,
  // like,
  // unlike
} from "../../actions/profile";
import Avatar from "react-avatar";

import "./ProfilePage.css";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// const MySwal = withReactContent(Swal);

// function fireStar() {
//   MySwal.fire({
//     title:
//       "Favorite this person if you would like to meet more people like this. We will use this information to recommend the most relevant people tailored to you.",
//     type: "info"
//   });
//   return false;
// }

// var userLikedProfile = (user, profile) => {
//   if (!profile || !profile.liked_users) return false;
//   if (!user) return false;
//   return profile.liked_users.indexOf(user.id) !== -1;
// };

// Need to get user data
const ProfilePage = ({
  user_id,
  profile: { display_profile, display_loading },
  getDisplayProfile,
  getRandomProfiles
  // like,
  // unlike,
}) => {
  var [profileData, setProfileData] = useState({
    name: "",
    email: "",
    avatar: "",
    college: "",
    year: "",
    major: "",
    minor: [],
    categories: [],
    bio: ""
  });

  var [randomProfiles, setRandomProfiles] = useState([]);

  // var [userLiked, setUserLiked] = useState(true);

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
          : display_profile.major,
      minor:
        display_loading || !display_profile || !display_profile.minor
          ? []
          : display_profile.minor.slice(0,8).join(", "),
      categories:
        display_loading || !display_profile || !display_profile.categories
          ? []
          : display_profile.categories,
      bio:
        display_loading || !display_profile || !display_profile.bio
          ? ""
          : display_profile.bio
    });

    // setUserLiked(userLikedProfile(user, display_profile));

    // getRandomProfiles could be optimized. rn it gets all profiles then randomly chooses 4
    if (display_loading === false) {
      getRandomProfiles(4, user_id).then(res => {
        setRandomProfiles(res);
      });
    }

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
            key={profile && profile.user && profile.user._id}
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

  const sayhi = () => {
    window.open(
      "mailto:" +
        profileData.email +
        "?subject=Would love to meet up for a meal sometime&body=I saw your profile on Day Zero and wanted to say hi!",
      "_blank"
    );
  };

  const categoryButtons = profileData.categories.map(cat => {
    return (
      <div className="profile-categories" key={cat}>
        {cat}
      </div>
    );
  });

  return (
    <div id="profile-page">
      <div className="left">
        <div className="info">
          <div className="header">
            <Avatar className="avatar" round src={profileData.avatar} />
            <div className="text-info">
              <div className="basic-info">
                <div className="name">{profileData.name}</div>
                <div className="major">{profileData.major}</div>
                {profileData && profileData.minor ? <div className="major">{profileData.minor}</div> : null}
                {profileData && profileData.year ? <div className="major">{profileData.year}</div> : null}
              </div>
              <div className="buttons">
                <button className="ui blue small button say-hi" onClick={sayhi}>
                  Say hi!
                </button>
                {/* <div className="like">
                  <div
                    className="ui small red button like-button"
                    onClick={() => handleToggleLike()}
                  >
                    <i className="heart icon"></i>
                    {userLiked ? unlikeButton : likeButton}
                  </div>
                  <u className="what-this" onClick={fireStar}>
                    What's this?
                  </u>
                </div> */}
              </div>
            </div>
          </div>
          <div className="categories">{categoryButtons}</div>
        </div>
        <div className="about-section">
          <div className="about-header">
            About {profileData.name.split(" ")[0]}
          </div>
          <div className="about-paragraph">{profileData.bio}</div>
        </div>
      </div>
      <div className="right">
        <h2 className="similar-title">Other Interesting People: </h2>
        <div className="also-viewed">{randomProfilesComponent}</div>
      </div>
    </div>
  );
};

ProfilePage.propTypes = {
  getDisplayProfile: PropTypes.func.isRequired,
  getUserProfile: PropTypes.func.isRequired,
  getRandomProfiles: PropTypes.func.isRequired,
  // like: PropTypes.func.isRequired,
  // unlike: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getDisplayProfile,
  getUserProfile,
  getRandomProfiles,
  // like,
  // unlike
})(ProfilePage);
