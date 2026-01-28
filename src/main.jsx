import React, { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";

import { ThemeProvider as AppThemeProvider } from "./context/ThemeContext";
import theme from "./theme";
import AnimatedRoutes from "./AnimatedRoutes";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppThemeProvider>
      <MuiThemeProvider theme={theme}>
        <Toaster position="top-right" />
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <AnimatedRoutes />
          </Suspense>
        </BrowserRouter>
      </MuiThemeProvider>
    </AppThemeProvider>
  </StrictMode>
);
