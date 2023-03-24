import React from "react";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import { useAppContext } from "store";
import { deleteToken } from "store";

function AccountSideBar() {
  const history = useHistory();
  const { store, dispatch } = useAppContext();
  const { isAuthenticated } = store;

  return (
    <>
      {isAuthenticated ? (
        <Button
          danger
          onClick={() => {
            dispatch(deleteToken());
          }}
        >
          로그아웃
        </Button>
      ) : (
        <>
          <Button
            type="primary"
            onClick={() => {
              history.push("/account/login");
            }}
          >
            로그인
          </Button>
          <Button
            danger
            onClick={() => {
              history.push("/account/signup");
            }}
          >
            회원가입
          </Button>
        </>
      )}
    </>
  );
}

export default AccountSideBar;
