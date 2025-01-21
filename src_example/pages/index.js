"use client";

import { useAuth } from "../../tools/cognito/AuthContext";
import { useCognito } from "../../tools/cognito/useCognito";
import authConfig from "../config/authConfig";

export default function Home() 
{
  const { tokens, setTokens, userName, setUserName, handleLogout } = useAuth();
  useCognito(setTokens, setUserName, authConfig);
  if(tokens) 
  {
    return <div>
      <button onClick={handleLogout}>logout</button> 
      <br></br>
      {userName||"Usuario"}
    </div>
  }
  else
  {
    return <div>
      <button onClick = {() => {
        const { clientId, redirectUri, cognitoDomain } = authConfig;
        const scope = "openid email profile";
        const loginUrl = `${cognitoDomain}/oauth2/authorize?client_id=${clientId}&response_type=code&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
        window.location.href = loginUrl;
      }}>login</button>
    </div>
  }
}