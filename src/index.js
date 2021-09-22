import React from "react";
import { render } from "react-dom";
// import Router from "./components/Router";
import App from "./components/App";
import "./css/style.css";

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector("#root")
);
