import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Dashboard from "../dashboard/Dashboard";
import CreateProfile from "../profile/CreateProfile";
import Feedback from "../feedback/Feedback";
import PrivateRoute from "../routing/PrivateRoute";
import NotFound from "../layout/NotFound";
// User types
import {
  REGISTERED,
  PROFILED,
  SCHEDULED,
  GROUPED,
  MET
} from "../../utils/consts";

const Routes = () => {
  return (
    <Switch>
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
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
