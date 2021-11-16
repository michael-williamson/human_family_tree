import React, { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import events from "../../../../data/events.json";
import { rockIcon } from "../../../../media";
import "../../../componentStyle/MarkerPopulateStyles.css";

const getEventObject = () => {
  return events.find((item) => item.eventName === "Microlith Stone Technology");
};

const eventObject = getEventObject();

export const MicrolithTechMarker = () => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div>
      <Marker
        position={{
          lat: eventObject.gpsCoor.lat,
          lng: eventObject.gpsCoor.long,
        }}
        onClick={() => setShowInfo(true)}
        opacity={1}
        icon={{
          url: rockIcon,
          scaledSize: new window.google.maps.Size(30, 30),
        }}
      />
      {showInfo && (
        <InfoWindow
          position={{
            lat: eventObject.gpsCoor.lat,
            lng: eventObject.gpsCoor.long,
          }}
          onCloseClick={() => setShowInfo(false)}
        >
          <div className="infoWindowContainer">
            <div className="overlayContainer">
              <h1 className="title">{eventObject.eventName}</h1>

              <div className="imgContainer">
                <img
                  className="displayImage"
                  src={eventObject.linksToPhotos[0]}
                  alt={eventObject.name}
                />

                <div className="imgAttributionContainer">placeholder text</div>
              </div>
              <div className="infoLinesContainer">
                <p className="infoLines">
                  Location:{" "}
                  <span className="eventObjectProps">{eventObject.city}</span>
                </p>
                <p className="infoLines">
                  Country:{" "}
                  <span className="eventObjectProps">
                    {eventObject.country}
                  </span>
                </p>
                <p className="infoLines">
                  Continent:{" "}
                  <span className="eventObjectProps">
                    {eventObject.continent}
                  </span>
                </p>
                <p className="infoLines">
                  Date:{" "}
                  <span className="eventObjectProps">{eventObject.date}</span>
                </p>
                <p className="infoLines">
                  More Info:
                  <a
                    href={eventObject.linkToInfo}
                    target="_blank"
                    rel="noreferrer"
                    className="anchor"
                  >
                    <span className="moreInfoLink">Click Here</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </InfoWindow>
      )}
    </div>
  );
};
