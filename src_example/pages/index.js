"use client";

import { useEffect } from "react";
import Interfaz from "../components/Interfaz";
import Button from "../design/components/Button";
import { useAuth } from "../../tools/cognito/AuthContext";
import { useCognito } from "../../tools/cognito/useCognito";
import authConfig from "../config/authConfig";

export default function Home() {
  const { tokens, setTokens, userName, setUserName } = useAuth();

  // Hook personalizado para manejar Cognito
  useCognito(setTokens, setUserName, authConfig);

  return (
    <div>
      {tokens ? (
        <Interfaz />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            textAlign: "center",
          }}
        >
          {/* <h1
            style={{
              fontSize: "4rem",
              fontWeight: "bold",
              marginBottom: "5%",
              color: "#133555",
            }}
          >
            Bienvenido a WeeLock
          </h1> */}

          <Button
            label={"Iniciar sesión"}
            size={"large"}
            variant={"primary"}
            onClick={() => {
              const { clientId, redirectUri, cognitoDomain } = authConfig;
              const scope = "openid email profile";
              const loginUrl = `${cognitoDomain}/oauth2/authorize?client_id=${clientId}&response_type=code&scope=${encodeURIComponent(
                scope
              )}&redirect_uri=${encodeURIComponent(redirectUri)}`;
              window.location.href = loginUrl;
            }}
          />
        </div>
      )}
    </div>
  );
}
