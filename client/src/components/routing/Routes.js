import React from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "../landing/Landing";
import SignUpLanding from "../landing/SignUpLanding";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Verification from "../auth/Verification";
import Section2 from "../landing/Section2";
import Dashboard from "../dashboard/Dashboard";
import Calendar from "../dashboard/calendar/Calendar";
import Activities from "../dashboard/activities/Activities";
import CreateProfile from "../profile/CreateProfile";
import Feedback from "../feedback/Feedback";
import PrivateRoute from "../routing/PrivateRoute";
import NotFound from "../layout/NotFound";
import ProfilePage from "../profile/ProfilePage";
import Search from "../search/Search";
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
      <Route exact path="/" component={Landing} />
      <Route exact path="/sign-up-landing" component={SignUpLanding} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/faq" component={Section2} />
      <Route exact path="/verification" component={Verification} />
      <Route
        exact
        path="/profile/:user_id"
        render={path_object => (
          <ProfilePage user_id={path_object.match.params.user_id} />
        )}
      />
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
        path="/dashboard/activities"
        access={[PROFILED, SCHEDULED, GROUPED, MET]}
        component={Activities}
      />
      <PrivateRoute
        exact
        path="/dashboard/schedule"
        access={[PROFILED, SCHEDULED, GROUPED, MET]}
        component={Calendar}
      />
      <PrivateRoute
        exact
        path="/search"
        access={[PROFILED, SCHEDULED, GROUPED, MET]}
        component={Search}
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
