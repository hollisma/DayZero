import React, { Fragment } from "react";
import { connect } from "react-redux";
import ProfileEducation from "./ProfileEducation";
import ProfileTopics from "./ProfileTopics";
import ProfileValues from "./ProfileValues";
import ProfileBio from "./ProfileBio";
import PropTypes from "prop-types";

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  return (
    <Fragment>
      <div>
        <ProfileEducation />
        <ProfileTopics />
        <ProfileValues />
        <ProfileBio />
      </div>
    </Fragment>
  );
};

Profile.propTypes = {};

export default Profile;
