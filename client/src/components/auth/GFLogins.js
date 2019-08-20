import React from "react";
// import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import config from "../../config/config.json";
import { googleLogin } from "../../actions/auth";
// import { googleLogin, facebookLogin } from "../../actions/auth";

const GFLogins = () => {
  const onFailure = error => {
    alert(error);
  };

  // const facebookResponse = response => {
  //   console.log(response);
  //   facebookLogin(response);
  // };

  const googleResponse = response => {
    console.log(response);
    googleLogin(response);
  };

  return (
    <div>
      {/* <FacebookLogin
        appId={config.FACEBOOK_APP_ID}
        autoLoad={false}
        fields="name,email,picture"
        callback={facebookResponse}
      /> */}
      <GoogleLogin
        clientId={config.GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={googleResponse}
        onFailure={onFailure}
      />
    </div>
  );
};

export default GFLogins;
