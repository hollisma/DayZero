import React from "react";
import Calendar from "./calendar/Calendar";
import EditProfile from "../profile/EditProfile";
import Group from "./group/Group";
import Activities from "./activities/Activities";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./Dashboard.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Dashboard = ({ auth: { user, loading: user_loading } }) => {
  if (!user_loading && user && !user.verified) {
    MySwal.fire({
      title:
        "Please click the link in the confirmation email we just sent you. Be sure to check your spam folder!",
      type: "info"
    });
  }

  return (
    <div className="dashboard">
      <Group />
      <Activities />
      <Calendar />
      <EditProfile />
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
