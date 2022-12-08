import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useInfoWindowContextUpdater } from "../MapStateComponents/InfoWindowStateProvider";
import { OPEN_INFO_WINDOW, SPECIES } from "../../../ConstantVariableNames";

export const SearchComponent = ({ searchableArray }) => {
  const [input, setInput] = useState("");
  const infoWindowContextUpdater = useInfoWindowContextUpdater();

  return (
    <Box sx={{ pt: 3 }}>
      <TextField
        id="outlined-search"
        label="Search"
        type="search"
        fullWidth={true}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        InputLabelProps={{
          sx: {
            color: "black",
            backgroundColor: "white",
            px: 3,
            fontSize: 20,
            borderRadius: 3,
          },
        }}
        InputProps={{ sx: { color: "black", backgroundColor: "white" } }}
      />
      {input.length > 0 && (
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              height: 150,
              width: "88%",
              backgroundColor: "black",
              position: "absolute",
              top: 0,
              overflowY: "scroll",
              zIndex: 100,
              pl: 2,
              pb: 3,
              border: "2px solid orange",
              borderTop: "none",
              fontFamily: (theme) => theme.fonts.Kalam,
            }}
          >
            {input.length > 0 &&
              searchableArray
                .filter((item) => item.name.includes(input) && item.name)
                .sort((a, b) => {
                  const nameA = a.name.toUpperCase();
                  const nameB = b.name.toUpperCase();
                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }

                  return 0;
                })
                .map((item) => (
                  <Box
                    key={item.name}
                    sx={{ color: "white", cursor: "pointer", py: 1 }}
                    onClick={() =>
                      infoWindowContextUpdater({
                        type: OPEN_INFO_WINDOW,
                        payload: { typeOfMarker: SPECIES, item },
                      })
                    }
                  >
                    {item.name}
                  </Box>
                ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};
