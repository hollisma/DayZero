import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getDefaultRoute } from "../routing/default_types";
import { GUEST } from "../../utils/consts";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
  access,
  ...rest
}) => {
  access = access == null ? [] : access;

  const userType = user ? user.user_type : GUEST;
  var defaultRoute = getDefaultRoute(userType);

  const userTypeIncluded =
    access.some(currentType => userType === currentType) || access.length === 0;

  return (
    <Route
      {...rest}
      render={props =>
        // (isAuthenticated && userTypeIncluded) || loading ? (
        //   <Component {...props} />
        // ) : (
        //   <Redirect to={defaultRoute} />
        // )
        (!isAuthenticated || !userTypeIncluded) && !loading ? (
          <Redirect to={defaultRoute} />
        ) : (
          <Component {...props} />
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
