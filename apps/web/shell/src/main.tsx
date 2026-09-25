import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LingvaProvider } from "@lingva/react";
import { createDemoRuntimeConfig } from "@lingva-demo/i18n";
import { App } from "./App";
import "./shell.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LingvaProvider config={createDemoRuntimeConfig(window.location.search)}>
      <App />
    </LingvaProvider>
  </StrictMode>,
);
