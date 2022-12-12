import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  TextField,
  Radio,
  CardMedia,
} from "@mui/material";
import { Box } from "@mui/system";
import { useInfoWindowContextUpdater } from "../MapStateComponents/InfoWindowStateProvider";
import { OPEN_INFO_WINDOW, SPECIES } from "../../../ConstantVariableNames";
import {
  searchByLabelsStyles,
  searchByRadioStyles,
  searchResultsContainerStyles,
  searchResultsImageStyles,
} from "../../../Styles/MapComponentStyles/MapKeyComponentStyles";

export const SearchComponent = ({ searchableArray }) => {
  const [input, setInput] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const infoWindowContextUpdater = useInfoWindowContextUpdater();

  const handleRadioChange = (e) => {
    setSearchBy(e.target.value);
  };

  return (
    <Box>
      <FormControl sx={{ py: 3 }}>
        <FormLabel id="searchBy-radio-buttons" sx={searchByLabelsStyles}>
          Search By:
        </FormLabel>
        <RadioGroup
          aria-labelledby="searchBy-radio-buttons"
          name="searchBy-radio-buttons"
          value={searchBy}
          onChange={handleRadioChange}
          row={true}
        >
          <FormControlLabel
            value="name"
            control={<Radio sx={searchByRadioStyles} />}
            label="Name"
            sx={searchByLabelsStyles}
          />
          <FormControlLabel
            value="city"
            control={<Radio sx={searchByRadioStyles} />}
            label="Location"
            sx={searchByLabelsStyles}
          />
          <FormControlLabel
            value="country"
            control={<Radio sx={searchByRadioStyles} />}
            label="Country"
            sx={searchByLabelsStyles}
          />
        </RadioGroup>
      </FormControl>
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
                .filter((item) =>
                  item[searchBy].toLowerCase().includes(input.toLowerCase())
                )
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
                    sx={searchResultsContainerStyles}
                    onClick={() =>
                      infoWindowContextUpdater({
                        type: OPEN_INFO_WINDOW,
                        payload: { typeOfMarker: SPECIES, item },
                      })
                    }
                  >
                    <Box> {item.name}</Box>
                    <Box>
                      {item.city}, {item.country}
                    </Box>
                    <CardMedia
                      component="img"
                      src={item.linksToPhotos[1]}
                      sx={searchResultsImageStyles}
                    />
                  </Box>
                ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};
