import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./pages";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/reset.css";
import { AppProvider } from "store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <Root />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
