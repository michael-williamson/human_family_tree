import React from "react";
import { CheckboxListComponent } from "./CheckboxListComponent";
import {
  labelCreator,
  overlaysArray,
} from "../../../../HelperFunctions/General";
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
        titleText="Overlays"
        formControlStyles={formControlStyles}
        checkboxStyles={checkboxStyles}
        customLabelProps={{ labelCreator }}
      />
    </div>
  );
};
