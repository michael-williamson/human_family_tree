import React from "react";
import { Box } from "@mui/system";
import { Header } from "./Components/HeaderComponents/Header";
import { Footer } from "./Components/FooterComponents/Footer";
import { Router } from "./Router";
import { mainAppContainerStyles } from "./Styles/MainAppStyles";

function App() {
  return (
    <Box sx={mainAppContainerStyles}>
      <Header />
      <Router />
      <Footer />
    </Box>
  );
}

export default App;
