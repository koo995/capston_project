import React from "react";
import "./AppLayout.scss";
import { Input } from "antd";
import LogoImage from "assets/boom.png";
import AccountSideBar from "./AccountSideBar";
import AlertSidebar from "./AlertSidebar";

const { Search } = Input;

function AppLayout({ children }) {
  return (
    <div className="app">
      <div className="header">
        <h1 className="page-title">
          <img src={LogoImage} alt="instagram" style={{ width: 150 }} />
        </h1>
        <div className="search">
          {/* 이렇게 하면 search의 길이가 줄어지네? */}
          <Search
            placeholder="검색어를 입력해 주세요"
            style={{ width: 300 }}
            size="middle"
          />
        </div>
        <div style={{ marginRight: "2rem" }}>
          <AccountSideBar />
        </div>
      </div>
      <div className="tagbar">tag 모음</div>
      <div className="content">{children}</div>
      <div className="alertSidebar" style={{ marginRight: "2rem" }}>
        <AlertSidebar />
      </div>
      <div className="footer">footer</div>
    </div>
  );
}

export default AppLayout;
