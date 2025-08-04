import { msalInstance, initializeMsal } from "./msalInstance";
import { loginRequest } from "./authConfig";

export const trySilentLogin = async () => {
  await initializeMsal(); // Ensure MSAL is initialized
  
  const accounts = msalInstance.getAllAccounts();

  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
    return accounts[0];
  }

  try {
    const result = await msalInstance.ssoSilent(loginRequest);
    msalInstance.setActiveAccount(result.account);
    return result.account;
  } catch (error) {
    console.warn("Silent login failed:", error);
    return null;
  }
};

export const login = async () => {
  await initializeMsal(); // Ensure MSAL is initialized
  return msalInstance.loginRedirect(loginRequest);
};

export const logout = async () => {
  await initializeMsal(); // Ensure MSAL is initialized
  return msalInstance.logoutRedirect();
};

export const getActiveAccount = async () => {
  await initializeMsal(); // Ensure MSAL is initialized
  return msalInstance.getActiveAccount();
};
    // export const getToken = async () => {
    //   const account = msalInstance.getActiveAccount();
    //   if (!account) {
    //     throw new Error("No active account found");
    //   }

    //   try {
    //     const response = await msalInstance.acquireTokenSilent({
    //       ...loginRequest,
    //       account: account,
    //     });
    //     return response.accessToken;
    //   } catch (error) {
    //     console.error("Token acquisition failed:", error);
    //     throw error;
    //   }
    // };