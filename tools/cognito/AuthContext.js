import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children, config }) => {
  const [tokens, setTokens] = useState(null);
  const [userName, setUserName] = useState("");

  // Load tokens from localStorage
  useEffect(() => {
    const storedIdToken = localStorage.getItem("id_token");
    const storedAccessToken = localStorage.getItem("access_token");
    const storedUserName = localStorage.getItem("user_name");

    if (storedIdToken && storedAccessToken) {
      setTokens({ idToken: storedIdToken, accessToken: storedAccessToken });
      setUserName(storedUserName || "");
    }
  }, []);

  const handleLogout = () => {
    const { clientId, cognitoDomain, redirectUri } = config;

    // Clear localStorage
    localStorage.removeItem("id_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_name");

    // Clear the state
    setTokens(null);
    setUserName("");

    // Redirect to logout
    const logoutUrl = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      redirectUri
    )}`;
    window.location.href = logoutUrl;
  };

  return (
    <AuthContext.Provider value={{ tokens, userName, setTokens, setUserName, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
