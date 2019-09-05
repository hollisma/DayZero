import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/landing/Landing";
// import Routes from "./components/routing/Routes";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile/CreateProfile";
import Feedback from "./components/feedback/Feedback";
import PrivateRoute from "./components/routing/PrivateRoute";
// import NotFound from "./components/layout/NotFound";
// User types
import {
  REGISTERED,
  PROFILED,
  SCHEDULED,
  GROUPED,
  MET
} from "./utils/consts";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

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
          <Switch>
            <Route exact path="/" component={Landing} />
            {/* <Route component={Routes} /> */}
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute
              exact
              path="/create-profile"
              access={[REGISTERED]}
              component={CreateProfile}
            />
            <PrivateRoute
              exact
              path="/dashboard"
              access={[PROFILED, SCHEDULED, GROUPED, MET]}
              component={Dashboard}
            />
            <PrivateRoute
              exact
              path="/feedback"
              access={[MET]}
              component={Feedback}
            />
            {/* <Route component={NotFound} /> */}
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
