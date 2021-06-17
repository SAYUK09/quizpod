import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export function Login() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      <button
        className="btn btn-primary btn-block"
        onClick={() => loginWithRedirect()}
      >
        Log In
      </button>
    </div>
  );
}
