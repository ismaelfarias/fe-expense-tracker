import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./AuthButton.module.css";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button 
      className={styles.authButton}
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Sair
    </button>
  );
}

export default LogoutButton;