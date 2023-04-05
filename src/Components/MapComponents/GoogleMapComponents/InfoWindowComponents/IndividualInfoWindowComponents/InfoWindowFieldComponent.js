import React from "react";
import { InfoFieldLabel } from "./InfoFieldLabel";
import { TextComponent } from "../../../../ReusableComponents/TextComponent";
import { InfoFieldText } from "./InfoFieldText";

export const InfoWindowFieldComponent = ({
  labelStyles,
  fieldTextStyles,
  label,
  fieldText,
}) => {
  return (
    <>
      <InfoFieldLabel>
        <TextComponent styles={labelStyles}>{label}</TextComponent>
      </InfoFieldLabel>
      <InfoFieldText>
        <TextComponent styles={fieldTextStyles}>{fieldText}</TextComponent>
      </InfoFieldText>
    </>
  );
};
