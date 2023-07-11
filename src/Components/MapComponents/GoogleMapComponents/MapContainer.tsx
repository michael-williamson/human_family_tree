import { GoogleMapComponent } from "./GoogleMapComponent";
import { mapContainerStyles } from "../../../Styles/MapComponentStyles/MapContainerStyles";
import { InfoWindowStateProvider } from "../MapStateComponents/InfoWindowStateProvider";
import { Container } from "../../ReusableComponents/Container";

export const MapContainer = () => {
  return (
    <Container containerStyles={mapContainerStyles}>
      <InfoWindowStateProvider>
        <GoogleMapComponent />
      </InfoWindowStateProvider>
    </Container>
  );
};
