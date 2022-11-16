import React from "react";
import { Box } from "@mui/system";
import { LocationOn, Fingerprint, Grass, Volcano } from "@mui/icons-material";

export const IconComponent = (props) => {
  const { name, iconProps } = props;
  const IconSelectorObject = (name, iconProps) => {
    switch (name) {
      case "LocationOn":
        return <LocationOn {...iconProps} />;
      case "FingerPrint":
        return <Fingerprint {...iconProps} />;
      case "Grass":
        return <Grass {...iconProps} />;
      case "Volcano":
        return <Volcano {...iconProps} />;
      default:
        <LocationOn />;
    }
  };
  return <Box>{IconSelectorObject(name, iconProps)}</Box>;
};
