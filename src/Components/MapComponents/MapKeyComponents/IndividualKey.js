import React, { useState } from "react";
import { Box } from "@mui/system";
import { IconButton, Button, Collapse } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { CheckboxListContainer } from "../CheckBoxComponents/CheckBoxListContainer";
import { CheckBoxListTitle } from "../CheckBoxComponents/CheckBoxListTitle";
import { CheckBoxList } from "../CheckBoxComponents/CheckBoxList";
import {
  titleTextStyles,
  checkboxListStyles,
  checkboxListContainerStyles,
  showListButtonStyles,
} from "../../../Styles/MapComponentStyles/MapKeyComponentStyles";
import { selectOrDeselectFN } from "../../../HelperFunctions/MapComponent/MapKeyComponents";

export const IndividualKey = (props) => {
  const [showList, setShowList] = useState(false);
  const {
    titleText,
    checkboxState,
    setCheckboxState,
    handleSelectAll = null,
    siblingElements = null,
    svgObject = null,
    checkboxComponentContainerStyles = {},
  } = props;
  const clickHandler = (e) => {
    setShowList(!showList);
  };

  return (
    <CheckboxListContainer
      checkboxListContainerStyles={checkboxListContainerStyles}
    >
      <Box onClick={clickHandler}>
        <CheckBoxListTitle
          titleTextStyles={titleTextStyles}
          titleText={titleText}
          iconComponent={{}}
        />
        <IconButton sx={showListButtonStyles}>
          <KeyboardArrowDown />
        </IconButton>
      </Box>

      <Collapse in={showList}>
        {handleSelectAll && (
          <Button onClick={handleSelectAll(selectOrDeselectFN(checkboxState))}>
            {selectOrDeselectFN(checkboxState) ? "Select All" : "Deselect All"}
          </Button>
        )}
        <CheckBoxList
          arr={Object.keys(checkboxState)}
          state={checkboxState}
          checkboxListStyles={checkboxListStyles}
          checkboxComponentContainerStyles={checkboxComponentContainerStyles}
          checkboxComponentProps={{ handleChange: setCheckboxState }}
          siblingElements={siblingElements}
          svgObject={svgObject}
        />
      </Collapse>
    </CheckboxListContainer>
  );
};
