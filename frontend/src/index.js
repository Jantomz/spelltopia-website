import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { WordlistsContextProvider } from "./context/WordlistContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WordlistsContextProvider>
        <App />
      </WordlistsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
