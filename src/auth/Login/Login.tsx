import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@material-ui/core";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";

export function Login() {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      <div>
        <div className="loginParent">
          <div className="loginBody">
            {isAuthenticated ? (
              <h1>See you back soon!</h1>
            ) : (
              <h1>Welcome to QuizPod</h1>
            )}

            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          </div>
        </div>
      </div>
    </div>
  );
}
