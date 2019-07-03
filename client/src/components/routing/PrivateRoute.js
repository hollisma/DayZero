import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  GUEST_DEFAULT,
  REGISTERED_DEFAULT,
  PROFILED_DEFAULT,
  MET_DEFAULT
} from "../routing/default_types";
import { GUEST, REGISTERED, PROFILED, MET } from "../../actions/types";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
  access,
  ...rest
}) => {
  access = access == null ? [] : access;

  var defaultRoute = GUEST_DEFAULT;
  const userType = user ? user.user_type : GUEST;
  switch (userType) {
    case REGISTERED:
      defaultRoute = REGISTERED_DEFAULT;
      break;
    case PROFILED:
      defaultRoute = PROFILED_DEFAULT;
      break;
    case MET:
      defaultRoute = MET_DEFAULT;
      break;
    default:
      defaultRoute = GUEST_DEFAULT;
      break;
  }
  console.log("defaultRoute", defaultRoute);

  const userTypeIncluded =
    access.some(currentType => userType === currentType) || access.length === 0;

  return (
    <Route
      {...rest}
      render={props =>
        (isAuthenticated && userTypeIncluded) || loading ? (
          <Component {...props} />
        ) : (
          <Redirect to={defaultRoute} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  access: PropTypes.array
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
