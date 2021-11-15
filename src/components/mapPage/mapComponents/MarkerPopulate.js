import React, { useState, Fragment } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import anthroData from "../../../data/anthroData.json";
import { datesCatergoryGreater } from "../../../data/listArrays";
import { iconColorGen, comparatorMain } from "../../helperFunctions";
//styles
import "../../componentStyle/MarkerPopulateStyles.css";
import { faSkull } from "@fortawesome/free-solid-svg-icons";

const htmlParser = (item) => {
  let regExHttp = /(http[^\\"]*)/g;
  let regExAnchorText = /<a [^>]+>([^<]+)<\/a>/;
  const httpArr = item.match(regExHttp);
  let result1 = item.match(regExAnchorText);

  try {
    return (
      <Fragment>
        <a
          href={httpArr[0]}
          target="_blank"
          rel="noreferrer"
          className="anchor imgAttribution"
        >
          {result1[1]}
        </a>
        <span className="imgAttribution">, via Wikipedia Commons</span>
      </Fragment>
    );
  } catch (error) {
    console.log(`error`, error);
    return null;
  }
};

const speciesColorObj = iconColorGen();

export const MarkerPopulate = (props) => {
  const [specimen, setSpecimen] = useState(null);
  const { speciesChecked, datesChecked } = props;

  return anthroData.map((item, index) => {
    const compareFn = comparatorMain(item.wholeNumberYears);
    let propString = compareFn();
    return (
      speciesChecked[`${item.species}`] &&
      datesChecked[datesCatergoryGreater[propString]?.timePeriod] && (
        <div key={index}>
          <Marker
            key={index}
            animation={window.google.maps.Animation.DROP}
            position={{ lat: item.gpsCoor.lat, lng: item.gpsCoor.long }}
            onClick={() => {
              setSpecimen(item);
            }}
            opacity={1}
            icon={{
              path: faSkull.icon[4],
              fillColor: speciesColorObj[item.species],
              fillOpacity: 1,
              scale: 0.035,
            }}
          />
          {specimen === item && (
            <InfoWindow
              position={{ lat: item.gpsCoor.lat, lng: item.gpsCoor.long }}
              onCloseClick={() => setSpecimen(null)}
            >
              <div className="infoWindowContainer">
                <div className="overlayContainer">
                  <h1 className="title">{item.name}</h1>

                  <div className="imgContainer">
                    <img
                      className="displayImage"
                      src={item.linksToPhotos[0]}
                      alt={item.name}
                    />

                    <div className="imgAttributionContainer">
                      {htmlParser(item.linksToPhotos[2])}
                    </div>
                  </div>
                  <div className="infoLinesContainer">
                    <p className="infoLines">
                      Location: <span className="itemProps">{item.city}</span>
                    </p>
                    <p className="infoLines">
                      Country: <span className="itemProps">{item.country}</span>
                    </p>
                    <p className="infoLines">
                      Continent:{" "}
                      <span className="itemProps">{item.continent}</span>
                    </p>
                    <p className="infoLines">
                      Species:{" "}
                      <span className="speciesText itemProps">
                        {item.species}
                      </span>
                    </p>
                    <p className="infoLines">
                      Date: <span className="itemProps">{item.date}</span>
                    </p>
                    <p className="infoLines">
                      More Info:
                      <a
                        href={item.linkToInfo}
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
      )
    );
  });
};
