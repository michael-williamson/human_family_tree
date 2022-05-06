import React from "react";

import { InfoWindowComponent } from "./InfoWindowComponent";

export const InfoWindowComponentContainer = (props) => {
  const { currentItem, handleCloseInfoWindowClick } = props;
  return (
    <InfoWindowComponent
      itemObject={currentItem}
      handleCloseInfoWindowClick={handleCloseInfoWindowClick}
    />
  );
};
