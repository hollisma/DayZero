import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/landing/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
// import Profile from "./components/profile/Profile";
import CreateProfile from "./components/profile/CreateProfile";
import Settings from "./components/dashboard/settings/Settings";
import PrivateRoute from "./components/routing/PrivateRoute";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
// User types
import { REGISTERED, PROFILED, MET } from "./actions/types";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar id="navbar" />
          <Route exact path="/" component={Landing} />
          <section className="ui top-container">
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              {/* <PrivateRoute
                exact
                path="/profile"
                access={[REGISTERED, PROFILED, MET]}
                component={Profile}
              /> */}
              <PrivateRoute
                exact
                path="/create-profile"
                access={[REGISTERED]}
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/settings"
                access={[REGISTERED, PROFILED, MET]}
                component={Settings}
              />
              <PrivateRoute
                exact
                path="/dashboard"
                access={[PROFILED, MET]}
                component={Dashboard}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
