import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./i18n";
import CustomSpinner from "./components/CustomSpinner.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <React.Suspense fallback={<CustomSpinner />}>
      <App />
    </React.Suspense>
  </React.StrictMode>
);
