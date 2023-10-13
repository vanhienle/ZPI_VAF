import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fontawesome/fontawesome-free/css/all.min.css";
import "react-chat-elements/dist/main.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Router>
    <App />
  </Router>
);
