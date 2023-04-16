import React from "react";
import "./AppLayout.scss";
import { Input } from "antd";
import LogoImage from "assets/boom.png";
import AccountSideBar from "./AccountSideBar";
import AlertSidebar from "./AlertSidebar";

const { Search } = Input;

function AppLayout({ children, tagbar, postNewButton, alertSidebar }) {
  return (
    <div className="app">
      <div className="header">
        <h1 className="page-title">
          <a href="http://localhost:3000">
            <img src={LogoImage} alt="instagram" style={{ width: 150 }} />
          </a>
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
      <div className="tagbar">{tagbar}</div>
      <div className="postNewButton" style={{ marginRight: "2rem" }}>
        {postNewButton}
      </div>
      <div className="content">{children}</div>
      <div className="alertSidebar" style={{ marginRight: "2rem" }}>
        {alertSidebar}
      </div>
      <div className="footer">&copy; 2023. gunhong951@gmail.com</div>
    </div>
  );
}

export default AppLayout;
