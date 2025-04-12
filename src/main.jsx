import { createRoot } from 'react-dom/client'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App.jsx'
import { AUTH_CONFIG } from './config/auth'

const root = createRoot(document.getElementById('root'))
root.render(
  <Auth0Provider
    domain={AUTH_CONFIG.domain}
    clientId={AUTH_CONFIG.clientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
      <App />
  </Auth0Provider>,
);
