import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import CreateProfile from "./CreateProfile";
import ProfileEducation from "./ProfileEducation";
import ProfileTopics from "./ProfileTopics";
import ProfileValues from "./ProfileValues";
import ProfileBio from "./ProfileBio";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profile";

const Profile = ({
  getCurrentProfile,
  profile: { profile, loading },
  auth
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : profile ? (
        <div>
          <ProfileEducation />
          <ProfileTopics />
          <ProfileValues />
          <ProfileBio />
        </div>
      ) : (
        <CreateProfile />
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Profile);
