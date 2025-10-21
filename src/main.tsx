import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        {/* Toast  */}
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: {
                background: "#0f766e",
                color: "#fff",
              },
              iconTheme: { primary: "#fff", secondary: "#0f766e" },
            },
            error: {
              style: { background: "#b91c1c", color: "#fff" },
            },
          }}
        />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
