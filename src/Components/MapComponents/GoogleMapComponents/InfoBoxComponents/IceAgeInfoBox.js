import React from "react";
import { Box } from "@mui/system";
import { CardMedia } from "@mui/material";
import { iceAgeTemperatures } from "../../../../Media/InfoWindowMedia";

export const IceAgeInfoBox = () => {
  return (
    <Box sx={{}}>
      <CardMedia
        component="img"
        src={iceAgeTemperatures}
        sx={{ width: "100%", height: "100%" }}
      />
    </Box>
  );
};
