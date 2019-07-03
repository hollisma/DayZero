import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
  access,
  ...rest
}) => {
  if (access == null) access = [];

  const userTypeIncluded =
    user &&
    (access.some(currentType => user.user_type === currentType) ||
      access.length == 0);

  return (
    <Route
      {...rest}
      render={props =>
        (isAuthenticated && userTypeIncluded) || loading ? (
          <Component {...props} />
        ) : (
          <Redirect to="login" />
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
