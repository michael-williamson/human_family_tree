import React from "react";
import { CheckboxListComponent } from "./CheckboxListComponent";
import { overlaysArray } from "../../../../HelperFunctions/General";
import {
  useOverlaysCheckbox,
  useOverlaysCheckboxUpdater,
} from "../../../../State/MapState/MapLegendState/OverlaysCheckboxProvider";
import { OnChangeFunctionType } from "../../../../Types/GlobalTypes";
import { addSubtractType } from "../../../../HelperFunctions/State/MapLegendState";
import { OVERLAYS } from "../../../../ConstantVariableNames";
import {
  checkboxStyles,
  formControlStyles,
} from "../../../../Styles/MapComponentStyles/MapKeyComponentStyles";
import { useOverlaysArrayContextUpdater } from "../../../../State/MapState/MapItemStateArrays/OverlaysArrayProvider";

export const OverlaysCheckboxList = () => {
  const overlaysCheckboxState = useOverlaysCheckbox();
  const overlaysCheckboxUpdater = useOverlaysCheckboxUpdater();
  const overlaysArrayUpdater = useOverlaysArrayContextUpdater();
  const clickHandler: OnChangeFunctionType = e => {
    console.log("e: ", e);
    const action = {
      type: addSubtractType(e.target.checked),
      category: e.target.dataset.category,
      fieldName: e.target.name,
    };
    overlaysCheckboxUpdater(action);
    overlaysArrayUpdater(action);
  };
  const inputProps = { "data-category": OVERLAYS };
  return (
    <div>
      <CheckboxListComponent
        arr={overlaysArray}
        state={overlaysCheckboxState as {}}
        clickHandler={clickHandler}
        inputProps={inputProps}
        formControlStyles={formControlStyles}
        checkboxStyles={checkboxStyles}
      />
    </div>
  );
};
