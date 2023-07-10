import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { createRoot } from "react-dom/client";
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
      <App />
  </Provider>
);
