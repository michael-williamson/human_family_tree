import { GoogleMapComponent } from "./GoogleMapComponent";
import { mapContainerStyles } from "../../../Styles/MapComponentStyles/MapContainerStyles";
import { MapLegendStateProvider } from "../MapStateComponents/MapLegendStateProvider";
import { InfoWindowStateProvider } from "../MapStateComponents/InfoWindowStateProvider";
import { Container } from "../../ReusableComponents/Container";

export const MapContainer = () => {
  return (
    <Container containerStyles={mapContainerStyles}>
      <MapLegendStateProvider>
        <InfoWindowStateProvider>
          <GoogleMapComponent />
        </InfoWindowStateProvider>
      </MapLegendStateProvider>
    </Container>
  );
};
