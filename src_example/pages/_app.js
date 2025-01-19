import '../design/globals.css'; // Importa los estilos globales
import { AuthProvider } from "../../tools/cognito/AuthContext";
import authConfig from "../config/authConfig";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider config={authConfig}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
