import { Checkbox, Collapse, FormControlLabel } from "@mui/material";
import { OnChangeFunctionType } from "../../../../Types/GlobalTypes";
import { CheckboxLIstTitle } from "./CheckboxLIstTitle";
import { Container } from "../../../ReusableComponents/Container";
import {
  checkboxListContainerStyles,
  checkboxListStyles,
} from "../../../../Styles/MapComponentStyles/MapKeyComponentStyles";
import { countLabelCreator } from "../../../../HelperFunctions/General";
import { useState } from "react";

// easy copy paste
// <CheckboxListComponent arr={[]} state={{}} clickHandler={(e)=>null}/>

interface KeyNameType {
  [key: string]: boolean | undefined;
}

interface CheckboxListTypes {
  arr: Array<any>;
  state: KeyNameType;
  clickHandler: OnChangeFunctionType;
  inputProps?: object;
  checkboxStyles?: object;
  formControlStyles?: object;
  titleText?: string;
  customLabelProps: any;
}

export const CheckboxListComponent = ({
  arr,

  state,
  inputProps,
  checkboxStyles,
  formControlStyles,
  clickHandler,
  titleText,
  customLabelProps: {
    labelStyle,
    labelCreator = () => "label",
    addOn = { label: "label" },
  },
}: CheckboxListTypes) => {
  const [showList, setShowList] = useState(false);
  const collapseHandler = (e: any) => {
    setShowList(!showList);
  };
  return (
    <Container containerStyles={checkboxListContainerStyles}>
      <CheckboxLIstTitle
        titleText={titleText}
        collapseHandler={collapseHandler}
      />
      <Collapse in={showList}>
        <Container containerStyles={checkboxListStyles}>
          {arr.map((item: string) => {
            return (
              <FormControlLabel
                key={item}
                disableTypography={true}
                label={labelCreator(item, addOn[item])}
                checked={state[item]}
                sx={formControlStyles}
                control={
                  <Checkbox
                    sx={checkboxStyles}
                    inputProps={inputProps}
                    name={item}
                    onChange={clickHandler}
                  />
                }
              />
            );
          })}
        </Container>
      </Collapse>
    </Container>
  );
};
