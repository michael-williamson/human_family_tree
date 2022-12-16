import React from "react";
import { Box } from "@mui/system";
import { Routes, Route } from "react-router-dom";
import { routes } from "./Routes/routes";
import { WelcomePage } from "./Pages/WelcomePage";
import { ChartPage } from "./Pages/ChartPage";
import { GalleryPage } from "./Pages/GalleryPage";
import { GlossaryPage } from "./Pages/GlossaryPage";
import { MapPage } from "./Pages/MapPage";
import { pagesContainerStyles } from "./Styles/PagesStyles";

export const Router = () => {
  return (
    <Box sx={pagesContainerStyles}>
      <Routes>
        <Route exact path={routes.Welcome} element={<WelcomePage />} />
        <Route exact path={routes.Map} element={<MapPage />} />
        <Route exact path={routes.Charts} element={<ChartPage />} />
        <Route exact path={routes.Gallery} element={<GalleryPage />} />
        <Route exact path={routes.Glossary} element={<GlossaryPage />} />
      </Routes>
    </Box>
  );
};
