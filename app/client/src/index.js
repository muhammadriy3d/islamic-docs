import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router} from "react-router-dom";
import { I18nextProvider } from "react-i18next";

import App from "./App";
import i18n from "./i18n";

import "./styles/_base.scss";

const main = ReactDOM.createRoot(document.getElementById("main"));

main.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Router>
        <App />
      </Router>
    </I18nextProvider>
  </React.StrictMode>,
);