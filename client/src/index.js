import React from "react";
import  ReactDOM from "react-dom/client";
import App from './App';
import { AuthContextProvider } from "./src/context/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <react.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </react.StrictMode>
)