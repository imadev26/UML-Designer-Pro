// src/App.js
import React, { useMemo, useState } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import DiagramEditor from "./components/UIComponents/DiagramEditor";
import { createTheme, ThemeProvider, CssBaseline, Box } from "@mui/material";
import { deepPurple, amber } from "@mui/material/colors";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: deepPurple[500], // Couleur primaire élégante
          },
          secondary: {
            main: amber[700], // Couleur secondaire contrastante
          },
          background: {
            default: darkMode ? "#121212" : "#f5f5f5",
            paper: darkMode ? "#1e1e1e" : "#ffffff",
          },
        },
        typography: {
          fontFamily: "Roboto, Arial, sans-serif",
          h5: {
            fontWeight: 700,
            letterSpacing: "0.5px",
          },
          h6: {
            fontWeight: 600,
            letterSpacing: "0.25px",
          },
          body1: {
            fontSize: "1rem",
            lineHeight: 1.5,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
                borderRadius: "8px",
                padding: "8px 16px",
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                padding: "6px",
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: "12px",
              },
            },
          },
        },
      }),
    [darkMode]
  );

  return (
    <Box 
      sx={{ 
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex'
      }}
    >
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <DiagramEditor darkMode={darkMode} setDarkMode={setDarkMode} />
        </ThemeProvider>
      </Provider>
    </Box>
  );
};

export default App;
