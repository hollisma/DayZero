import React from "react";
import EditProfile from "../profile/EditProfile";
import Group from "./group/Group";
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
        "To ensure you're a Princeton student, please click the link in the confirmation email we just sent you",
        // "We just sent you an email with a link you can click on to verify your account",
        // "Please click the link in the confirmation email we just sent you. Be sure to check your spam folder!",
      type: "info"
    });
  }

  return (
    <div className="my-container">
      <Group />
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
