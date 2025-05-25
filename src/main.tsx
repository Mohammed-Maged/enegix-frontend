import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext.tsx";
import { initIndexedDB } from "./utils/initIndexedDb.ts";
import { registerSW } from "virtual:pwa-register";
import { SyncProvider } from "./context/SyncContext.tsx";

initIndexedDB()
  .then(() => console.log("IndexedDB ready"))
  .catch((err) => console.error("IndexedDB init failed", err));
registerSW({ immediate: true });

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SyncProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SyncProvider>
    </QueryClientProvider>
  </StrictMode>
);
