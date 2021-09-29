import React, { useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { Marker, InfoWindow } from "@react-google-maps/api";
import anthroData from "../../data/anthroData.json";
import { datesCategoryObj } from "../../data/listArrays";
import { dateComparer } from "../helperFunctions";
//icons
import { imageFiles } from "../../data/listArrays";
//styles
import "../componentStyle/MarkerPopulateStyles.css";

export const MarkerPopulate = (props) => {
  const [specimen, setSpecimen] = useState(null);
  const { speciesChecked, datesChecked } = props;

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
              <div className="infoWindowContainer">
                <div className="overlayContainer">
                  <h1 className="title">{item.name}</h1>
                  <img
                    className="displayImage"
                    src={item.linksToPhotos[0]}
                    alt={item.name}
                  />
                  <div className="imgAttribution">
                    {ReactHtmlParser(item.linksToPhotos[1])}
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
                      Species: <span className="">Homo {item.species}</span>
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
                      >
                        <span className="">Click Here</span>
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
