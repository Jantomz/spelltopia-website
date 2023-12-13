import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { WordsContextProvider } from "./context/WordContext";
import { AuthContextProvider } from "./context/AuthContext";
import { WordlistsContextProvider } from "./context/WordlistContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WordlistsContextProvider>
        <WordsContextProvider>
          <App />
        </WordsContextProvider>
      </WordlistsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
