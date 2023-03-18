import React from "react";
import { Route } from "react-router-dom";
import AppLayout from "components/Layout/AppLayout";
import Home from "./Home";
import accountRoutes from "./account";

function Root() {
  return (
    <AppLayout>
      <Route exact path="/" component={Home} />
      {/* 여기서 exact을 썼더니 login profile url에 의한 페이지가 제대로 나오지 않았어*/}
      <Route path="/account" component={accountRoutes} />{" "}
    </AppLayout>
  );
}

export default Root;
