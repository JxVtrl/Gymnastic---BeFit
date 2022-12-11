import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { AppProvider, AuthProvider } from "./context";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <AuthProvider>
          <AppProvider>
            <Router />
          </AppProvider>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
