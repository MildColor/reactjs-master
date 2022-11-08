import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import router from "./Router";
import { RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
