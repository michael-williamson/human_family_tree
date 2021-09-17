import React, { useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { Marker, InfoWindow } from "@react-google-maps/api";
import anthroData from "../../data/anthroData.json";
import { datesCategoryObj } from "../../data/listArrays";
//icons
import { imageFiles } from "../../data/listArrays";
//styles
import { styles as markerPopulateStyles } from "../componentStyle/MarkerPopulateStyles";

export const MarkerPopulate = (props) => {
  const [specimen, setSpecimen] = useState(null);
  const { speciesChecked, datesChecked } = props;
  const {
    infoWindowContainer,
    overlayContainer,
    title,
    displayImage,
    imgAttribution,
    infoLinesContainer,
    infoLines,
    itemProps,
    speciesText,
  } = markerPopulateStyles;

  const dateComparer = (compareDateGreater, compareDateLesser, inputDate) => {
    return compareDateGreater >= inputDate && inputDate >= compareDateLesser;
  };

  const dateComparerControl = (datesChecked, inputDate, dateComparer) => {
    const resultsArr = [];
    for (const prop in datesChecked) {
      if (
        datesChecked[prop] &&
        dateComparer(
          datesCategoryObj[prop].greater,
          datesCategoryObj[prop].lesser,
          inputDate
        )
      ) {
        resultsArr.push(true);
      }
    }
    return resultsArr.find((item) => item === true);
  };

  return anthroData.map((item, index) => {
    return (
      speciesChecked[`${item.species}`] &&
      dateComparerControl(
        datesChecked,
        item.wholeNumberYears,
        dateComparer
      ) && (
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
              url: imageFiles[item.species],
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
          {specimen === item && (
            <InfoWindow
              position={{ lat: item.gpsCoor.lat, lng: item.gpsCoor.long }}
              onCloseClick={() => setSpecimen(null)}
            >
              <div style={infoWindowContainer}>
                <div style={overlayContainer}>
                  <h1 style={title}>{item.name}</h1>
                  <img
                    style={displayImage}
                    src={item.linksToPhotos[0]}
                    alt={item.name}
                  />
                  <div style={imgAttribution}>
                    {ReactHtmlParser(item.linksToPhotos[1])}
                  </div>
                  <div style={infoLinesContainer}>
                    <p style={infoLines}>
                      Location: <span style={itemProps}>{item.city}</span>
                    </p>
                    <p style={infoLines}>
                      Country: <span style={itemProps}>{item.country}</span>
                    </p>
                    <p style={infoLines}>
                      Continent: <span style={itemProps}>{item.continent}</span>
                    </p>
                    <p style={infoLines}>
                      Species:{" "}
                      <span style={{ ...itemProps, ...speciesText }}>
                        Homo {item.species}
                      </span>
                    </p>
                    <p style={infoLines}>
                      Date: <span style={itemProps}>{item.date}</span>
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
