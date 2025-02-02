import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {createContext} from "react"



export const server = "http://localhost:3000";

export const  Context = createContext({isAuthenticated: false});

const AppWrapper = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true" // Load from localStorage
  );
  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Context.Provider value={{isAuthenticated, setIsAuthenticated}}>
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);