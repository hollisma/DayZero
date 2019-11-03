import React from "react";
import queryString from "query-string";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { verification } from "../../actions/auth";
import "./auth.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Verification = ({
  verification,
  verified,
  verificationFailed,
  location
}) => {
  let { token } = queryString.parse(location.search);
  console.log(token);
  if (!verified && !verificationFailed) {
    verification(token);
  }
  if (verified) {
    MySwal.fire({
      title: "Your account is verified",
      type: "success"
    });
    return <Redirect to="dashboard" />;
  }
  if (verificationFailed) {
    MySwal.fire({
      title: "Verification failed",
      type: "error"
    });
    return <Redirect to="/" />;
  }
  return (
    <div id="section1" className="ui bigger-top-container">
      <div className="upper-container">
        <h3 id="tagline">Verifying your account...</h3>
        <h3 id="tagline">{token}</h3>
      </div>
    </div>
  );
};

Verification.propTypes = {
  verification: PropTypes.func.isRequired,
  verified: PropTypes.bool.isRequired,
  verificationFailed: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  verified: state.auth.verified,
  verificationFailed: state.auth.verificationFailed
});

export default connect(
  mapStateToProps,
  { verification }
)(Verification);
