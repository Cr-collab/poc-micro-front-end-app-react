import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import MuiThemeProvider from "./components/mui-theme-provider.tsx";
import UsersPage from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MuiThemeProvider>
      <UsersPage />
    </MuiThemeProvider>
  </StrictMode>
);
