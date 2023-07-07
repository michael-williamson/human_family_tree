import React from "react";
import { Box } from "@mui/system";
import { Routes, Route } from "react-router-dom";
import { routes } from "./Routes/routes";
import { WelcomePage } from "./Pages/WelcomePage";
import { ChartPage } from "./Pages/ChartPage";
import { GalleryPage } from "./Pages/GalleryPage";
import { MapPage } from "./Pages/MapPage";
import { pagesContainerStyles } from "./Styles/PagesStyles";

export const Router = () => {
  return (
    <Box sx={pagesContainerStyles}>
      <Routes>
        <Route path={routes.Welcome} element={<WelcomePage />} />
        <Route path={routes.Map} element={<MapPage />} />
        <Route path={routes.Charts} element={<ChartPage />} />
        <Route path={routes.Gallery} element={<GalleryPage />} />
      </Routes>
    </Box>
  );
};
