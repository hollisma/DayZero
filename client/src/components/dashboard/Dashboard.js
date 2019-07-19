<<<<<<< HEAD
import React from 'react';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profile';
import { connect } from 'react-redux';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  return <div>Dashboard</div>;
=======
import React from "react";
import Settings from "./settings/Settings";
import Group from "./group/Group";
import PropTypes from "prop-types";

const Dashboard = props => {
  return (
    <div>
      <Group />
      <Settings />
    </div>
  );
>>>>>>> 3e0187a8a12c3734db9b2970ef9679b6148de800
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
