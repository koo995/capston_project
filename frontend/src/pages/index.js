import React from "react";
import { Route } from "react-router-dom";
import LoginRequiredRoute from "utils/LoginRequiredRoute";
import Home from "./Home";
import accountRoutes from "./account";
import PostDetail from "./PostDetail";
import PostNew from "./PostNew";

function Root() {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route exact path="/posts/:id" component={PostDetail} />
      <LoginRequiredRoute exact path="/posts/new" component={PostNew} />
      {/* 여기서 exact을 썼더니 login profile url에 의한 페이지가 제대로 나오지 않았어*/}
      <Route path="/account" component={accountRoutes} />
    </>
  );
}

export default Root;
