import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Wrap the App with Authenticator so users must sign in */}
    <Authenticator>
      <App />
    </Authenticator>
  </React.StrictMode>
);
