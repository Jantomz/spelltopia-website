import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { WordsContextProvider } from "./context/WordContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WordsContextProvider>
        <App />
      </WordsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
