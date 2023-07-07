import { InfoFieldLabel } from "./InfoFieldLabel";
import { TextComponent } from "../../../../ReusableComponents/TextComponent";
import { InfoFieldText } from "./InfoFieldText";

interface InfoWindowFieldTypes {
  labelStyles: any;
  fieldTextStyles: any;
  label: string;
  fieldText: any;
}

export const InfoWindowFieldComponent = ({
  labelStyles,
  fieldTextStyles,
  label,
  fieldText,
}: InfoWindowFieldTypes) => {
  return (
    <>
      <InfoFieldLabel styles={null}>
        <TextComponent styles={labelStyles}>{label}</TextComponent>
      </InfoFieldLabel>
      <InfoFieldText>
        <TextComponent styles={fieldTextStyles}>{fieldText}</TextComponent>
      </InfoFieldText>
    </>
  );
};
