import { CheckboxListComponent } from "./CheckboxListComponent";
import { DATES } from "../../../../ConstantVariableNames";
import {
  countLabelCreator,
  datesArr,
} from "../../../../HelperFunctions/General";
import {
  useDatesCheckbox,
  useDatesCheckboxUpdater,
} from "../../../../State/MapState/MapLegendState/DatesCheckboxProvider";
import { OnChangeFunctionType } from "../../../../Types/GlobalTypes";
import { addSubtractType } from "../../../../HelperFunctions/State/MapLegendState";
import {
  checkboxStyles,
  formControlStyles,
} from "../../../../Styles/MapComponentStyles/MapKeyComponentStyles";
import { useSpecimensArrayContextUpdater } from "../../../../State/MapState/MapItemStateArrays/SpecimensArrayProvider";
import { useSpeciesCheckbox } from "../../../../State/MapState/MapLegendState/SpeciesCheckboxProvider";
import { useDatesCountContext } from "../../../../State/MapState/MapItemCountState/DatesCountProvider";

const inputProps = { "data-category": DATES };

export const DatesCheckboxList = () => {
  const datesCheckboxState = useDatesCheckbox();
  const speciesCheckboxState = useSpeciesCheckbox();
  const datesCheckboxUpdater = useDatesCheckboxUpdater();
  const specimensArrayUpdater = useSpecimensArrayContextUpdater();
  const datesCount = useDatesCountContext();
  const clickHandler: OnChangeFunctionType = e => {
    console.log("e: ", e);
    const action = {
      type: addSubtractType(e.target.checked),
      category: e.target.dataset.category,
      fieldName: e.target.name,
      checkboxState: speciesCheckboxState,
      count: datesCount,
    };
    datesCheckboxUpdater(action);
    specimensArrayUpdater(action);
  };

  return (
    <>
      <CheckboxListComponent
        arr={datesArr}
        state={datesCheckboxState as {}}
        clickHandler={clickHandler}
        inputProps={inputProps}
        formControlStyles={formControlStyles}
        checkboxStyles={checkboxStyles}
        customLabelProps={{
          labelCreator: countLabelCreator,
          addOn: datesCount,
        }}
      />
    </>
  );
};
