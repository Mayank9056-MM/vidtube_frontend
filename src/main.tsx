import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
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
  </StrictMode>
);
