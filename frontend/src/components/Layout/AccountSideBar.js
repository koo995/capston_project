import React from "react";
import { Menu } from "antd";

function AccountSideBar() {
  return (
    <div>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="horizontal inline"
      >
        <Menu.Item>Avatar</Menu.Item>
        <Menu.Item>로그아웃</Menu.Item>
      </Menu>
    </div>
  );
}

export default AccountSideBar;
