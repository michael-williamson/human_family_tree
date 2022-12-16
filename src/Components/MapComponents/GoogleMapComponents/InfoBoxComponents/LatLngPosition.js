import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import { InfoBoxComponentMain } from "./InfoBoxComponentMain";

export const LatLngPosition = ({
  latLngObject: { position, rightClick },
  setLatLngObject,
}) => {
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    if (instance === null) {
      return;
    }

    if (instance && instance.closeListener === null) {
      return;
    }
    instance.closeListener.instance.hidden = true;
  }, [instance]);

  useEffect(() => {
    if (instance === null) {
      return;
    }
    if (rightClick) {
      instance.isHidden = false;
    }
  }, [rightClick, instance]);

  const handleOnLoad = (infoBoxInstance) => {
    setInstance(infoBoxInstance);
    infoBoxInstance.hidden = true;
  };

  return (
    <InfoBoxComponentMain
      position={position}
      optional={{
        onLoad: handleOnLoad,
        pixelOffset: { height: 40, width: 40 },
      }}
    >
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.customColors.darkBG,
          borderRadius: 2,
          width: 350,
          display: "grid",
          gridTemplateColumns: "repeat(3,auto)",
          gridTemplateRows: "repeat(2,auto)",
          justifyContent: "space-around",
          position: "relative",
        }}
      >
        <Box
          sx={{
            color: "white",
            cursor: "pointer",
            fontSize: 14,
            textAlign: "center",
            gridColumn: "1/4",
          }}
          onClick={(e) => {
            instance.isHidden = true;
            setLatLngObject((prev) => ({
              ...prev,
              rightClick: false,
            }));
          }}
        >
          [close]
        </Box>
        <Box sx={{ color: "white", fontSize: 20, py: 1, pl: 3 }}>
          lat: {position.lat}
        </Box>
        <Box sx={{ color: "white", fontSize: 20, py: 1 }}>
          lng: {position.lng}
        </Box>
        <IconButton
          onClick={(e) =>
            navigator.clipboard
              .writeText(`lat:${position.lat} lng:${position.lng}`)
              .then((val) => alert("copied!", val))
          }
        >
          <ContentCopy sx={{ color: "white" }} />
        </IconButton>
      </Box>
    </InfoBoxComponentMain>
  );
};
