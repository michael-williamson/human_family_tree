import { Container } from "../../../../ReusableComponents/Container";
import { InfoWindowFieldComponent } from "./InfoWindowFieldComponent";

interface FieldComponentListTypes {
  listContainerStyles: any;
  listItemContainerStyles: any;
  labelObject: any;
  label?: string;
  fieldText?: string;
  labelFN?: any;
  fieldTextFN?: any;
  labelStyles: any;
  fieldTextStyles: any;
  itemObject: any;
}

// example:  the incoming label object will look something similar to this
//
//  labelObjectExample = {
//   Continent: "continent",
//   Country: "country",
//   Date: "date",
//   Location: "city",
//   Species: "species",
// };
//
//  ['Continent', 'Country', 'Date', 'Location', 'Species'] after Object.keys() where
//  each "item" in map array is like one of the following
//
// itemObject is the object that populates the InfoWindow

export const FieldComponentList = ({
  listContainerStyles,
  listItemContainerStyles,
  labelObject,
  label,
  fieldText,
  labelFN,
  fieldTextFN,
  labelStyles,
  fieldTextStyles,
  itemObject,
}: FieldComponentListTypes) => {
  return (
    <Container containerStyles={listContainerStyles}>
      {Object.keys(labelObject).map(item => (
        <Container containerStyles={listItemContainerStyles} key={item}>
          <InfoWindowFieldComponent
            label={label || labelFN(item)}
            labelStyles={labelStyles}
            fieldText={
              fieldText ||
              fieldTextFN({
                sourceObject: itemObject,
                labelObject,
                itemText: item,
              })
            }
            fieldTextStyles={fieldTextStyles}
          />
        </Container>
      ))}
    </Container>
  );
};
