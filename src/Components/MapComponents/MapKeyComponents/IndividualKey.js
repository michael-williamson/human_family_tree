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
import {
  eventObjectArrayNames,
  handleHover,
  selectOrDeselectFN,
} from "../../../HelperFunctions/MapComponent/MapKeyComponents";
import { DESELECT_ALL, SELECT_ALL } from "../../../ConstantVariableNames";

export const IndividualKey = (props) => {
  const [showList, setShowList] = useState(false);

  const {
    titleText,
    checkboxState,
    setCheckboxState,
    handleSelectAll = null,
    siblingElements = null,
    svgObject = null,
    individualPropertyState,
    countObject,
    checkboxComponentContainerStyles = {},
    contextFN,
  } = props;
  const checkboxListArr = Object.keys(checkboxState);

  const clickHandler = (e) => {
    setShowList(!showList);
  };

  const selectAllText = selectOrDeselectFN(checkboxState)
    ? SELECT_ALL
    : DESELECT_ALL;

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
        {/* NOTE: some individual keys may not require a select all / deselect all function 
            which is the reason for the handleSelectAll boolean short circuit
        */}
        {/* {handleSelectAll && checkboxListArr.length >= 3 && (
          <Button onClick={handleSelectAll({ selectAllText })}>
            {selectAllText}
          </Button>
        )} */}
        <CheckBoxList
          arr={checkboxListArr}
          state={checkboxState}
          containerEventObject={
            eventObjectArrayNames.includes(individualPropertyState)
              ? {
                  onMouseLeave: handleHover(contextFN)(individualPropertyState),
                }
              : {}
          }
          checkboxListStyles={checkboxListStyles}
          checkboxComponentContainerStyles={checkboxComponentContainerStyles}
          checkboxComponentProps={{
            handleChange: setCheckboxState,
            fieldEventObject: eventObjectArrayNames.includes(
              individualPropertyState
            )
              ? {
                  onMouseEnter: handleHover(contextFN),
                }
              : {},
            countObject,
          }}
          siblingElements={siblingElements}
          svgObject={svgObject}
        />
      </Collapse>
    </CheckboxListContainer>
  );
};
