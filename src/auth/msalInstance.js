import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";

export const msalInstance = new PublicClientApplication(msalConfig);

// Initialize MSAL instance
let initializePromise;

export const initializeMsal = () => {
  if (!initializePromise) {
    initializePromise = msalInstance.initialize();
  }
  return initializePromise;
};