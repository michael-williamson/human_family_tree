import React, { Fragment } from "react";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import { makeStyles } from "@material-ui/core";

const htmlParser = (item) => {
  let regExHttp = /(http[^\\"]*)/g;
  let regExAnchorText = /<a [^>]+>([^<]+)<\/a>/;
  const httpArr = item.match(regExHttp);
  let result1 = item.match(regExAnchorText);

  try {
    return (
      <Fragment>
        <a href={httpArr[0]} target="_blank" rel="noreferrer">
          {result1[1]}
        </a>
        <span>, via Wikipedia Commons</span>
      </Fragment>
    );
  } catch (error) {
    console.log(`error`, item);
    return null;
  }
};

const GalleryItemComponent = (props) => {
  const { arr, item, itemToRender } = props;
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "#707070",
      fontSize: 20,
      margin: 10,
      padding: 10,
      position: "relative",
      height: "fit-content",
      minHeight: 440,
      minWidth: 240,
    },
    showImageIcon: {
      position: "absolute",
      color: "white",
      top: 5,
      left: 10,
      zIndex: 10,
      cursor: "pointer",
      "&:hover + div": {
        opacity: 0,
      },
    },
    infoDiv: {
      position: "absolute",
      height: "100%",
      width: "100%",
      top: 0,
      backgroundColor: "rgb(0 0 0 / 69%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      opacity: 1,
      transition: "opacity 300ms",
      "&:hover i": {
        opacity: 0,
      },
    },
    item: {
      padding: 10,
    },
    itemLabel: {
      fontSize: "1rem",
      color: "beige",
    },
    titleLabel: {
      fontSize: "2rem",
      color: "beige",
      fontWeight: "bold",
    },
    itemInfo: {
      color: "orange",
      fontWeight: "bold",
    },
    speciesInfo: {
      fontStyle: "italic",
      color: "orange",
      fontWeight: "bold",
    },
    imgCreditItem: {
      color: "cadetblue",
      fontStyle: "italic",
      fontSize: ".8rem",
      paddingTop: 10,
      "& a": {
        textDecoration: "none",
        color: "#1f9ed2",
      },
    },
    img: {
      width: "100%",
      height: "100%",
      maxHeight: 500,
    },
    cardActionsRoot: {
      justifyContent: "center",
    },
  }));

  const classes = useStyles();
  return item === itemToRender
    ? arr.map((item, index) => {
        return (
          <div className={classes.root}>
            <div>
              <img
                src={item.linksToPhotos[0]}
                alt="human fossil"
                className={classes.img}
              />
            </div>
            <ImageSearchIcon
              className={classes.showImageIcon}
              fontSize="large"
            />
            <div className={classes.infoDiv}>
              <div className={classes.item}>
                <span className={classes.titleLabel}>{item.name}</span>
              </div>
              <div className={classes.item}>
                <span className={classes.itemLabel}>Species: </span>
                <span className={classes.speciesInfo}>{item.species}</span>
              </div>
              <div className={classes.item}>
                <span className={classes.itemLabel}>Location: </span>
                <span className={classes.itemInfo}>{item.city}</span>
              </div>
              <div className={classes.item}>
                <span className={classes.itemLabel}>Country: </span>
                <span className={classes.itemInfo}>{item.country}</span>
              </div>
              <div className={classes.item}>
                <span className={classes.itemLabel}>Continent: </span>
                <span className={classes.itemInfo}>{item.continent}</span>
              </div>
              <div className={classes.item}>
                <span className={classes.itemLabel}>Date: </span>
                <span className={classes.itemInfo}>{item.date}</span>
              </div>
              <div className={classes.item}>
                <span className={classes.itemLabel}>Image Credit: </span>
                <div className={classes.imgCreditItem}>
                  {htmlParser(item.linksToPhotos[2])}
                </div>
              </div>
            </div>
          </div>
        );
      })
    : null;
};

export default GalleryItemComponent;
