import { InfoWindow } from "@react-google-maps/api";
import { Container } from "../../../ReusableComponents/Container";

export const InfoWindowComponent = ({
  children,
  position,
  closeClickHandler,
  infoWindowContainerStyles,
  itemContainerStyles,
}: any) => {
  return (
    <Container containerStyles={infoWindowContainerStyles}>
      <InfoWindow position={position} onCloseClick={closeClickHandler}>
        <Container containerStyles={itemContainerStyles}>{children}</Container>
      </InfoWindow>
    </Container>
  );
};
