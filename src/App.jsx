// Imports
import "./index.css";
import Employee from "./pages/Employee";
import Navbar from "./components/navbar";

// Material UI
import { Box, CssBaseline, ThemeProvider } from "@mui/material";

// Theme
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Navbar />
        <Box
          component="main"
          sx={{ py: 3, background: theme.palette.bg.main, minHeight: "100vh" }}
        >
          <Employee />
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
