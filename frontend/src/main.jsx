import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { AuthContextProvider } from "./Components/authContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SnackbarProvider maxSnack={2}>
          <App />
        </SnackbarProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
