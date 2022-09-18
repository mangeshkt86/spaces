import * as React from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import theme from "./theme";
import UserContextProvider from "./contexts/userContext";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import AllocationContextProvider from "./contexts/allocationContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <UserContextProvider>
      <AllocationContextProvider>
        <Router>
          <App />
        </Router>
      </AllocationContextProvider>
    </UserContextProvider>
  </ThemeProvider>
);
