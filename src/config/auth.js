export const AUTH_CONFIG = {
    domain: import.meta.env.VITE_AUTH0_DOMAIN || process.env.AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || process.env.AUTH0_CLIENT_ID
};