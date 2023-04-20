import React, { useContext } from "react";
import "./AppLayout.scss";
import LogoImage from "assets/boom.png";
import AccountSideBar from "./AccountSideBar";
import SearchBar from "components/SearchBar";
import { QueryContext } from "components/SearchBar";

function AppLayout({ children, tagbar, postNewButton, alertSidebar }) {
  const { handleSearch } = useContext(QueryContext);

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
          <SearchBar onSearch={handleSearch} />
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
