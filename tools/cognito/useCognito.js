import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const useCognito = (setTokens, setUserName, config) => {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get("code");

    if (code) {
      const { clientId, redirectUri, cognitoDomain } = config;
      const tokenEndpoint = `${cognitoDomain}/oauth2/token`;

      fetch(tokenEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: clientId,
          redirect_uri: redirectUri,
          code,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.id_token && data.access_token) {
            const decodedToken = jwtDecode(data.id_token);
            const userName = decodedToken.name || decodedToken.email;
            const userSub = decodedToken.sub;

            localStorage.setItem("id_token", data.id_token);
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("user_name", userName);
            localStorage.setItem("user_sub", userSub);

            setTokens({ idToken: data.id_token, accessToken: data.access_token });
            setUserName(userName);

            //Clear the URL
            window.history.replaceState({}, document.title, "/");
          }
        })
        .catch((err) => console.error("Error al obtener tokens:", err));
    }
  }, [setTokens, setUserName, config]);
};
