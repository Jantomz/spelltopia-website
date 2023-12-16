import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { WordlistsContextProvider } from "./context/WordlistContext";
import { UserContextProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <WordlistsContextProvider>
          <App />
        </WordlistsContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
