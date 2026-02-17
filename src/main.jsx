import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  const errorMsg = "VITE_CLERK_PUBLISHABLE_KEY is missing in your environment variables. Please add it to Netlify settings.";
  console.error(errorMsg);
  // Optional: render a simple error message to the DOM so user sees something
  document.body.innerHTML = `<div style="padding: 20px; font-family: sans-serif; color: red;"><h1>Configuration Error</h1><p>${errorMsg}</p></div>`;
  throw new Error(errorMsg);
}

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>
);
