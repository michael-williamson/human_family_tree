import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Box } from "@mui/system";
import { Header } from "./Components/HeaderComponents/Header";
import { Footer } from "./Components/FooterComponents/Footer";
import { Router } from "./Router";
import { mainAppContainerStyles } from "./Styles/MainAppStyles";
import "./App.css";
import { MapPopulationStateContext } from "./Components/MapComponents/MapStateComponents/MapPopulationStateContext";
import { HTTPRequestStateProvider } from "./Components/MapComponents/MapStateComponents/HTTPRequestStateProvider";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Box sx={mainAppContainerStyles}>
            <Header />
            <MapPopulationStateContext>
              <HTTPRequestStateProvider>
                <Router />
              </HTTPRequestStateProvider>
            </MapPopulationStateContext>

            <Footer />
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
