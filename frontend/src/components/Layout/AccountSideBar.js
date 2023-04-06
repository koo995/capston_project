import React, { useEffect, useState } from "react";
import { Avatar, Button } from "antd";
import { useHistory } from "react-router-dom";
import { useAppContext, deleteToken } from "store";
import Axios from "axios";

function AccountSideBar() {
  const history = useHistory();
  const { store, dispatch } = useAppContext();
  const { jwtAccessToken, isAuthenticated } = store;
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    async function fetchUserInfo() {
      const apiUrl = "http://localhost:8000/account/user-info/";
      const headers = { Authorization: `Bearer ${jwtAccessToken}` };
      try {
        const { data: userInfoData } = await Axios.get(apiUrl, { headers });
        setUserInfo(userInfoData);
        console.log("userInfoData: ", userInfoData);
      } catch (error) {
        console.log("error: ", error);
      }
    }
    fetchUserInfo();
  }, [jwtAccessToken]); //우와... 여기를 jwtAccessToken 넣어주니 내가 원하는대로 잘 작동하네!!
  console.log("userInfo: ", userInfo);
  return (
    <>
      {isAuthenticated ? ( //여기를 소괄호로 감싸주는 이유... 코드를 더 잘 읽기위해서 라는군@!
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "20px" }}>
            <Avatar
              size={"large"}
              icon={
                userInfo && <img src={userInfo.avatar_url} alt={"아바타"} />
              }
            />
          </div>
          <div>
            <Button
              danger
              onClick={() => {
                dispatch(deleteToken());
              }}
            >
              로그아웃
            </Button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "10px" }}>
            <Button
              type="primary"
              onClick={() => {
                history.push("/account/login");
              }}
            >
              로그인
            </Button>
          </div>
          <div>
            <Button
              danger
              onClick={() => {
                history.push("/account/signup");
              }}
            >
              회원가입
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default AccountSideBar;
