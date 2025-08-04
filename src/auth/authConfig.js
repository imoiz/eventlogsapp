export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_APP_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
    redirectUri: import.meta.env.VITE_AZURE_REDIRECT_URI,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
};
// export const tokenRequest = {
//   scopes: ["User.Read"],
// };