import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppContext } from "store";

export default function LoginRequiredRoute({
  //파이썬스럽게 파라미터들을 받아본다 component속성값으로 넘어오면 여기서는 Component로 사용하겠다
  component: Component,
  ...kwargs
}) {
  const {
    store: { isAuthenticated },
  } = useAppContext();

  return (
    <Route
      {...kwargs} //이렇게 하면 속성값이 알아서 펼쳐지는 것이다.
      //여기에 props은 다양한 값들이 넘어온다 match, location, 등등
      //react-router-dom에서 컴포넌트로 넘어가는 속성값들이 넘어온다
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/account/login",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
}
