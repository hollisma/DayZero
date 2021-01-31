import React from "react";
import ProfilePage from '../profile/ProfilePage'
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getDefaultRoute } from "../routing/default_types";
import { GUEST } from "../../utils/consts";

const PrivateRoute = ({
  auth: { isAuthenticated, loading, user },
  component: Component,
  access,
  path,
  ...rest
}) => {
  access = access == null ? [] : access;

  const userType = user ? user.user_type : GUEST;
  var defaultRoute = getDefaultRoute(userType);

  const userTypeIncluded =
    access.some(currentType => userType === currentType) || access.length === 0;

  return <Route
    {...rest}
    render={props =>
      (!isAuthenticated || !userTypeIncluded) && !loading ? (
        <Redirect to={defaultRoute} />
      ) : path.split('/')[1] === 'profile' ? (
        <Route
          exact
          path="/profile/:user_id"
          render={path_object => (
            <ProfilePage user_id={path_object.match.params.user_id} />
          )}
        />
      ) : (
        <Component {...props} path={path} />
      )
    }
  />
  
  // console.log(userTypeIncluded, isAuthenticated, loading)
  // console.log(user)

  // return (
  //   <Route {...rest} render={props => (
  //     userTypeIncluded && isAuthenticated
  //       ? <Component {...props} />
  //       : <Redirect to={defaultRoute} />
  //   )} />
  // )

  // return !localStorage.getItem('token') ? (
  // // return (!isAuthenticated || !userTypeIncluded) && !loading ? (
  //   <Redirect to={defaultRoute} />
  // ) : <Route
  //       {...rest}
  //       component={Component}
  //       path={path}
  //     />

  // const returnRoute = <Route
  //   {...rest}
  //   // render={render ? render : props =>
  //   render={render ? render : props =>
  //     // (isAuthenticated && userTypeIncluded) || loading ? (
  //     //   <Component {...props} />
  //     // ) : (
  //     //   <Redirect to={defaultRoute} />
  //     // )
  //     !isAuthenticated || !userTypeIncluded ? (
  //       <Redirect to={defaultRoute} />
  //     ) : (
  //       <Component {...props} />
  //     )
  //   }
  // />
  // 
  // return loading ? (
  //   <div />
  // ) : returnRoute;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  access: PropTypes.array
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
