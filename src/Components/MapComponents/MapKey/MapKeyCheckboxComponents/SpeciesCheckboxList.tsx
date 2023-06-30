import { CheckboxListComponent } from "./CheckboxListComponent";
import { addSubtractType } from "../../../../HelperFunctions/State/MapLegendState";
import { OnChangeFunctionType } from "../../../../Types/GlobalTypes";
import {
  useSpeciesCheckbox,
  useSpeciesCheckboxUpdater,
} from "../../../../State/MapState/MapLegendState/SpeciesCheckboxProvider";
import { labelCreator, speciesArr } from "../../../../HelperFunctions/General";
import { SPECIES } from "../../../../ConstantVariableNames";
import {
  checkboxStyles,
  formControlStyles,
} from "../../../../Styles/MapComponentStyles/MapKeyComponentStyles";
import { useSpecimensArrayContextUpdater } from "../../../../State/MapState/MapItemStateArrays/SpecimensArrayProvider";
import { useDatesCheckbox } from "../../../../State/MapState/MapLegendState/DatesCheckboxProvider";
import { useSpeciesCountContext } from "../../../../State/MapState/MapItemCountState/SpeciesCountProvider";

const inputProps = { "data-category": SPECIES };

export const SpeciesCheckboxList = () => {
  const speciesCheckboxUpdater = useSpeciesCheckboxUpdater();
  const speciesCheckboxState = useSpeciesCheckbox();
  const datesCheckboxState = useDatesCheckbox();
  const specimensArrayUpdater = useSpecimensArrayContextUpdater();
  const speciesCount = useSpeciesCountContext();
  const clickHandler: OnChangeFunctionType = e => {
    const action = {
      type: addSubtractType(e.target.checked),
      category: e.target.dataset.category,
      fieldName: e.target.name,
      checkboxState: datesCheckboxState,
      count: speciesCount,
    };
    speciesCheckboxUpdater(action);
    specimensArrayUpdater(action);
  };

  return (
    <>
      <CheckboxListComponent
        arr={speciesArr}
        state={speciesCheckboxState as {}}
        clickHandler={clickHandler}
        inputProps={inputProps}
        titleText="Sort by Species"
        formControlStyles={formControlStyles}
        checkboxStyles={checkboxStyles}
        customLabelProps={{
          labelCreator,
          addOn: speciesCount,
        }}
      />
    </>
  );
};
