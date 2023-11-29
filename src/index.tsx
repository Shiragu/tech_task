import useMockAdapter from "@core/api/useMockAdapter";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./styles/global.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root not found!");
}

const root = createRoot(rootElement);

const RootApp = () => {
  useMockAdapter();

  return <App />;
};

root.render(
  <StrictMode>
    <RootApp />
  </StrictMode>
);
