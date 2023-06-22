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
import { MapLegendStateProvider } from "./State/MapState/MapLegendState/MapLegendStateProvider";
import { MapStateProvider } from "./State/MapState/MapStateProvider";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Box sx={mainAppContainerStyles}>
            <Header />
            <MapStateProvider>
              <MapPopulationStateContext>
                <HTTPRequestStateProvider>
                  <MapLegendStateProvider>
                    <Router />
                  </MapLegendStateProvider>
                </HTTPRequestStateProvider>
              </MapPopulationStateContext>
            </MapStateProvider>

            <Footer />
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
