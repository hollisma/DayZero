import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ProfilePage = props => {
  return <div></div>;
};

ProfilePage.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps)(ProfilePage);
