import { CLOSE_INFO_WINDOW, SPECIES } from "../../../../ConstantVariableNames";

import {
  fieldTextFN,
  labelFN,
  typeOfMarkersObject,
} from "../../../../HelperFunctions/MapComponent/GoogleMapsComponent/InfoWindowComponents/fieldsAndLabels";
import {
  imageAttributionLabelStyles,
  imageAttributionLinkStyles,
  infoWindowContainerStyles,
  infoWindowFieldsContainerStyles,
  infoWindowImageStyles,
  infoWindowIndividualFieldsContainer,
  infoWindowLabelFieldStyles,
  infoWindowMainContainerStyles,
  infoWindowTextFieldStyles,
  infoWindowTitleText,
} from "../../../../Styles/MapComponentStyles/GoogleMapComponentStyles/InfoWindowComponentStyles";
import { AttributedImageComponent } from "../../../ReusableComponents/AttributedImageComponent";
import { TextComponent } from "../../../ReusableComponents/TextComponent";
import {
  useInfoWindowContext,
  useInfoWindowContextUpdater,
} from "../../MapStateComponents/InfoWindowStateProvider";
import { FieldComponentList } from "./IndividualInfoWindowComponents/FieldComponentList";
import { InfoWindowMoreInfoLink } from "./IndividualInfoWindowComponents/InfoWindowMoreInfoLink";
import { InfoWindowComponent } from "../InfoWindowComponents/InfoWindowComponent";

export const MarkerItemInfoWindow = (props: any) => {
  const { item, typeOfMarker, closeWindow } = useInfoWindowContext();
  const infoWindowContextUpdater = useInfoWindowContextUpdater();
  const { name, linksToPhotos = [], linkToInfo, gpsCoor } = item;
  const [linkOne, linkTwo] = linksToPhotos;

  if (closeWindow === true) {
    return null;
  }

  const closeClickHandler = () =>
    infoWindowContextUpdater({ type: CLOSE_INFO_WINDOW });

  const labelObject = typeOfMarkersObject[typeOfMarker];

  let author, license;

  if (item.attributesArray) {
    if (item.attributesArray.length === 2) {
      author = item.attributesArray[0];
      license = item.attributesArray[1];
    }
  }
  return (
    <InfoWindowComponent
      position={gpsCoor}
      closeClickHandler={closeClickHandler}
      infoWindowContainerStyles={infoWindowMainContainerStyles}
      itemContainerStyles={infoWindowContainerStyles}
    >
      <TextComponent styles={infoWindowTitleText}>{name}</TextComponent>
      <AttributedImageComponent
        src={typeOfMarker === SPECIES ? linkTwo : linkOne}
        author={author}
        license={license}
        imageStyles={infoWindowImageStyles}
        labelStyles={imageAttributionLabelStyles}
        linkStyles={imageAttributionLinkStyles}
      />
      <FieldComponentList
        listContainerStyles={infoWindowFieldsContainerStyles}
        listItemContainerStyles={infoWindowIndividualFieldsContainer}
        labelObject={labelObject}
        labelStyles={infoWindowLabelFieldStyles}
        fieldTextStyles={infoWindowTextFieldStyles}
        itemObject={item}
        fieldTextFN={fieldTextFN}
        labelFN={labelFN}
      />
      <InfoWindowMoreInfoLink
        label={"Link to More Info:"}
        labelStyles={infoWindowLabelFieldStyles}
        fieldTextStyles={infoWindowLabelFieldStyles}
        linkText="Click Here"
        linkStyles={infoWindowTextFieldStyles}
        href={linkToInfo}
        fieldText={""}
      />
    </InfoWindowComponent>
  );
};
