import { InfoBox } from "@react-google-maps/api";
import React from "react";

export const InfoBoxComponentMain = ({ position, optional, children }) => {
  return (
    <InfoBox position={position} {...optional}>
      {children}
    </InfoBox>
  );
};
