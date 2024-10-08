import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "@/App.tsx";

import "@/app/styles/global.css";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") return;

  const { worker } = await import("@/shared/api/mocks/browser");

  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
