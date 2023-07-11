import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Header } from "./Components/HeaderComponents/Header";
import { Footer } from "./Components/FooterComponents/Footer";
import { Router } from "./Router";
import { mainAppContainerStyles } from "./Styles/MainAppStyles";
import "./App.css";
import { MapLegendStateProvider } from "./State/MapState/MapLegendState/MapLegendStateProvider";
import { MapStateProvider } from "./State/MapState/MapStateProvider";
import { Container } from "./Components/ReusableComponents/Container";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Container containerStyles={mainAppContainerStyles}>
            <Header />
            <MapStateProvider>
              <MapLegendStateProvider>
                <Router />
              </MapLegendStateProvider>
            </MapStateProvider>

            <Footer />
          </Container>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
