import React from "react";
import "./LoginButton.module.css";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className="AuthButton" onClick={() => loginWithRedirect()}>Log In</button>;
}

export default LoginButton;