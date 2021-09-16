import React, { useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { Marker, InfoWindow } from "@react-google-maps/api";
import anthroData from "../../data/anthroData.json";
import { datesCatergoryObj } from "../../data/listArrays";
//icons
import {
  beardedManIconBlack,
  beardedManIconBlue,
  beardedManIconGreen,
  beardedManIconYellow,
  beardedManIconWhite,
  beardedManIconPurple,
} from "../../media/index";
//styles
import { styles as markerPopulatorStyles } from "../componentStyle/MarkerPopulatorStyles";

export const MarkerPopulator = (props) => {
  const [specimen, setSpecimen] = useState(null);
  const { speciesChecked, datesChecked } = props;
  const {
    infoWindowContainer,
    overlayContainer,
    title,
    displayImage,
    imgAttributation,
    infoLinesContainer,
    infoLines,
    itemProps,
    speciesText,
  } = markerPopulatorStyles;

  const dateComparer = (compareDateGreater, compareDateLesser, inputDate) => {
    return compareDateGreater >= inputDate && inputDate >= compareDateLesser;
  };

  const dateComparerControl = (datesChecked, inputDate, dateComparer) => {
    const resultsArr = [];
    for (const prop in datesChecked) {
      if (
        datesChecked[prop] &&
        dateComparer(
          datesCatergoryObj[prop].greater,
          datesCatergoryObj[prop].lesser,
          inputDate
        )
      ) {
        resultsArr.push(true);
      }
    }
    return resultsArr.find((item) => item === true);
  };

  const iconChooser = (itemSpecies) => {
    let species = itemSpecies;
    let switchFnChoice;
    switch (species) {
      case "habilis":
        switchFnChoice = beardedManIconBlack;
        break;
      case "erectus":
        switchFnChoice = beardedManIconYellow;
        break;
      case "rudolfensis":
        switchFnChoice = beardedManIconBlue;
        break;
      case "sapiens":
        switchFnChoice = beardedManIconGreen;
        break;
      case "heidelbergensis":
        switchFnChoice = beardedManIconWhite;
        break;
      case "neanderthalensis":
        switchFnChoice = beardedManIconPurple;
        break;
      default:
        switchFnChoice = beardedManIconBlack;

      // case "longi":
      //   day = "Saturday";
    }

    return switchFnChoice;
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
            position={{ lat: item.gpsCoor.lat, lng: item.gpsCoor.long }}
            onClick={() => setSpecimen(item)}
            opacity={0.75}
            icon={{
              url: iconChooser(item.species),
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
                  <div style={imgAttributation}>
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
