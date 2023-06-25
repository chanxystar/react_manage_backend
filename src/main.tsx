import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { createRoot } from "react-dom/client";
import React from "react";
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
