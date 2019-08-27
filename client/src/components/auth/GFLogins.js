import React from "react";
import { connect } from "react-redux";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import config from "../../config/config.json";
// import { glogin } from "../../actions/auth";
import { glogin, fblogin } from "../../actions/auth";
import PropTypes from "prop-types";

const GFLogins = ({ glogin }) => {
  const onFailure = error => {
    console.log("google error");
    console.log(error);
  };

  const facebookResponse = response => {
    console.log(response);
    fblogin(response);
  };

  const googleResponse = response => {
    // console.log(response);
    glogin(response);
  };

  return (
    <div>
      <FacebookLogin
        appId={config.FACEBOOK_APP_ID}
        autoLoad={false}
        fields="name,email,picture"
        callback={facebookResponse}
        version="3.1"
      />
      <GoogleLogin
        clientId={config.GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={googleResponse}
        onFailure={onFailure}
      />
    </div>
  );
};

GFLogins.propTypes = {
  glogin: PropTypes.func.isRequired,
  fblogin: PropTypes.func.isRequired
};

export default connect(
  null,
  { glogin, fblogin }
)(GFLogins);
