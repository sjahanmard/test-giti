import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import AuthContextProvider, { AuthContext } from "../components/AuthContext";

function MyApp({ Component, pageProps }) {
  const theme = createTheme({
    palette: {
      primary: { main: "#607D8B" },
      secondary: { main: "#01579B" },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <CssBaseline />
        <Navbar />

        <Component {...pageProps} />
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
