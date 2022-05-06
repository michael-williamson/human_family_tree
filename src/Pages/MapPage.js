import React from "react";
import { Box } from "@mui/system";
import { PageTitle } from "../Components/ReusableComponents/PageTitle";
import { MapContainer } from "../Components/MapComponents/GoogleMapComponents/MapContainer";
import { routesIcons } from "../HelperFunctions/Routes";

export const MapPage = () => {
  return (
    <Box>
      <PageTitle text="Map" imageSrc={routesIcons.Map} />
      <MapContainer />
    </Box>
  );
};
