import React, { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import events from "../../../../data/events.json";
import { lakeTobaIcon } from "../../../../media";
import "../../../componentStyle/MarkerPopulateStyles.css";

const lakeTobaEvent = () => {
  return events.find(
    (lakeTobaObject) => lakeTobaObject.eventName === "Lake Toba Eruption"
  );
};

const lakeTobaObject = lakeTobaEvent();

export const LakeTobaMarker = () => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div>
      <Marker
        position={{
          lat: lakeTobaObject.gpsCoor.lat,
          lng: lakeTobaObject.gpsCoor.long,
        }}
        onClick={() => setShowInfo(true)}
        opacity={1}
        icon={{
          url: lakeTobaIcon,
          scaledSize: new window.google.maps.Size(30, 30),
        }}
      />
      {showInfo && (
        <InfoWindow
          position={{
            lat: lakeTobaObject.gpsCoor.lat,
            lng: lakeTobaObject.gpsCoor.long,
          }}
          onCloseClick={() => setShowInfo(false)}
        >
          <div className="infoWindowContainer">
            <div className="overlayContainer">
              <h1 className="title">{lakeTobaObject.eventName}</h1>

              <div className="imgContainer">
                <img
                  className="displayImage"
                  src={lakeTobaObject.linksToPhotos[0]}
                  alt={lakeTobaObject.name}
                />

                <div className="imgAttributionContainer">placeholder text</div>
              </div>
              <div className="infoLinesContainer">
                <p className="infoLines">
                  Location:{" "}
                  <span className="lakeTobaObjectProps">
                    {lakeTobaObject.city}
                  </span>
                </p>
                <p className="infoLines">
                  Country:{" "}
                  <span className="lakeTobaObjectProps">
                    {lakeTobaObject.country}
                  </span>
                </p>
                <p className="infoLines">
                  Continent:{" "}
                  <span className="lakeTobaObjectProps">
                    {lakeTobaObject.continent}
                  </span>
                </p>
                <p className="infoLines">
                  Date:{" "}
                  <span className="lakeTobaObjectProps">
                    {lakeTobaObject.date}
                  </span>
                </p>
                <p className="infoLines">
                  More Info:
                  <a
                    href={lakeTobaObject.linkToInfo}
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
