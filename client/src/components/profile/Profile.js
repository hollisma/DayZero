import React, { Fragment } from "react";
import ProfileEducation from "./ProfileEducation";
import ProfileTopics from "./ProfileTopics";
import ProfileValues from "./ProfileValues";
import ProfileBio from "./ProfileBio";
import PropTypes from "prop-types";

const Profile = () => {
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
