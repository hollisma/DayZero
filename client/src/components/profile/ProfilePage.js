import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserProfile } from "../../actions/profile";

// Need to get user data
const ProfilePage = ({
  user_id,
  profile: { display_profile, display_loading },
  auth: { user, loading: user_loading },
  getUserProfile
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

  useEffect(() => {
    getUserProfile(user_id);
    console.log("hi", user_id);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserProfile, user_id, display_loading]);

  console.log(profileData);
  return <div></div>;
};

ProfilePage.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getUserProfile }
)(ProfilePage);
