import { makeStyles } from "@material-ui/core";
import React from "react";
import anthroData from "../data/anthroData.json";

export const HumanGallery = () => {
  const useStyles = makeStyles({
    titleGalleryComp: {},
    photoGalleryComp: {
      display: "inline-flex",
      flexDirection: "column",
      border: "3px solid black",
      alignConter: "center",
      alignItems: "center",
      padding: "28px 15px",
      margin: "25px 7px",
      color: "brown",
    },
    h1: {
      display: "block",
      fontStyle: "italic",
      color: "blue",
    },
    img: {
      height: 300,
      margin: "0 10px",
    },
  });

  const classes = useStyles();

  const PhotoGalleryComp = (props) => {
    if (!props.species) {
      return null;
    }
    let filteredArr = anthroData.filter(
      (item) => props.species === item.species
    );
    let imageMap = filteredArr.map((item, index) => {
      return (
        <div className={classes.photoGalleryComp}>
          <img
            key={index}
            src={item.linksToPhotos[0]}
            alt={item.species}
            className={classes.img}
          />
          <h2>Name: {item.name}</h2>
          <h2>Location: {item.city}</h2>
          <h2>Country: {item.country}</h2>
          <h2>Continent: {item.continent}</h2>
          <h2>Estimated Time Period: {item.date}</h2>
        </div>
      );
    });
    return imageMap;
  };

  const TitleGalleryComp = (props) => {
    let currentSpecies = null;
    return anthroData.map((item, index) => {
      if (!currentSpecies) {
        currentSpecies = item.species;
        return (
          <div key={index} className={classes.titleGalleryComp}>
            <h1 className={classes.h1}>{item.species}</h1>
            <PhotoGalleryComp species={item.species} />
          </div>
        );
      } else if (item.species !== currentSpecies) {
        currentSpecies = item.species;
        return (
          <div key={index} className={classes.titleGalleryComp}>
            <h1 className={classes.h1}>{item.species}</h1>
            <PhotoGalleryComp species={item.species} />
          </div>
        );
      } else {
        return null;
      }
    });
  };
  return (
    <div>
      <TitleGalleryComp />
    </div>
  );
};
