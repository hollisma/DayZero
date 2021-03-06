import React from "react";
import queryString from "query-string";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { verification } from "../../actions/auth";
import "./auth.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Verification = ({
  verification,
  auth: { user, loading: user_loading, verificationFailed },
  location
}) => {
  let verified = !user_loading && user && user.verified;
  let { token } = queryString.parse(location.search);

  // if (user && !verified && !verificationFailed) {
  if (!verified && !verificationFailed) {
    // verification(token, user._id);
    verification(token);
  }

  // if (!user_loading && verified) {
  if (verified) {
    MySwal.fire({
      title: "Your account is verified",
      type: "success"
    }).then(() => {
      window.location.href = "/dashboard/#";
    });
  }
  // if (!user_loading && verificationFailed) {
  if (verificationFailed) {
    MySwal.fire({
      title: "Verification failed",
      type: "error"
    }).then(() => {
      window.location.href = "/dashboard#";
    });
  }

  return (
    <div id="section1" className="ui bigger-top-container">
      <div className="upper-container">
        <h3 id="tagline">Verifying your account...</h3>
      </div>
    </div>
  );
};

Verification.propTypes = {
  verification: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { verification })(Verification);
