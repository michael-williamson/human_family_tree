import { GoogleMapComponent } from "./GoogleMapComponent";
import { mapContainerStyles } from "../../../Styles/MapComponentStyles/MapContainerStyles";
import { MapLegendStateProvider } from "../MapStateComponents/MapLegendStateProvider";
import { InfoWindowStateProvider } from "../MapStateComponents/InfoWindowStateProvider";
import { Container } from "../../ReusableComponents/Container";
import { MapStateProvider } from "../../../State/MapState/MapStateProvider";

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
