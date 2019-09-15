import React from "react";
import { connect } from "react-redux";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import config from "../../config/config.json";
import { glogin, fblogin } from "../../actions/auth";
import PropTypes from "prop-types";

import "./auth.css";

const GFLogins = ({ glogin, fblogin }) => {
  const onFailure = error => {
    console.log("google error");
    console.log(error);
  };

  const facebookResponse = response => {
    console.log(response);
    fblogin(response);
  };

  const googleResponse = response => {
    console.log(response);
    glogin(response);
  };

  return (
    <div className="social-logins">
      <div className="button">
        <FacebookLogin
          appId={config.FACEBOOK_APP_ID}
          autoLoad={false}
          fields="name,email,picture"
          callback={facebookResponse}
        />
      </div>
      <div class="button">
        <GoogleLogin
          clientId={config.GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={googleResponse}
          onFailure={onFailure}
        />
      </div>
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
