/**
 *
 * This component is not being used. The getCurrentProfile is called after the fragment loads so profile is always null.
 *
 */

import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import CreateProfile from "./CreateProfile";
import EditProfile from "./EditProfile";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profile";

const Profile = ({ getCurrentProfile, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile, profile]);

  return (
    <Fragment>
      {console.log("profile", profile)}
      {loading ? <Spinner /> : profile ? <EditProfile /> : <CreateProfile />}
    </Fragment>
  );
};

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Profile);
