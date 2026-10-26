import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Route changes manage scroll position themselves (see PageTransition).
if ("scrollRestoration" in history) history.scrollRestoration = "manual";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
