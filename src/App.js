import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Box } from "@mui/system";
import { Header } from "./Components/HeaderComponents/Header";
import { Footer } from "./Components/FooterComponents/Footer";
import { Router } from "./Router";
import { mainAppContainerStyles } from "./Styles/MainAppStyles";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Box sx={mainAppContainerStyles}>
            <Header />
            <Router />
            <Footer />
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
