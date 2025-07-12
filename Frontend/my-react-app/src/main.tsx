import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";

import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { store } from "./store"; 

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}> 
      <MantineProvider>
        <App />
      </MantineProvider>
    </Provider>
  </StrictMode>
);
