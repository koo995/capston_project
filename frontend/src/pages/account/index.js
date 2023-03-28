import React from "react";
import { Route } from "react-router-dom";
import Profile from "./Profile";
import Login from "./Login";
import Signup from "./Signup";
import LoginRequiredRoute from "utils/LoginRequiredRoute";
import AppLayout from "components/Layout/AppLayout";

function Routes({ match }) {
  return (
    <AppLayout>
      <LoginRequiredRoute
        exact
        path={match.url + "/profile"}
        component={Profile}
      />
      <Route exact path={match.url + "/login"} component={Login} />
      <Route exact path={match.url + "/signup"} component={Signup} />
    </AppLayout>
  );
}

export default Routes;
