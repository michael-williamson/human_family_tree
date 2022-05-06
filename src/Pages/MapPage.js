import React from "react";
import { Box } from "@mui/system";
import { routesIcons } from "../Routes/routes";
import { PageTitle } from "../Components/ReusableComponents/PageTitle";
import { MapContainer } from "../Components/MapComponents/GoogleMapComponents/MapContainer";

export const MapPage = () => {
  return (
    <Box>
      <PageTitle text="Map" imageSrc={routesIcons.Map} />
      <MapContainer />
    </Box>
  );
};
