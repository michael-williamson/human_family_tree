import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import ReactHtmlParser from "react-html-parser";
import anthroData from "../data/anthroData.json";

const PhotoGalleryComp = (props) => {
  const useStyles = makeStyles({
    titleGalleryComp: {},
    photoGalleryComp: {
      display: "inline-flex",
      flexDirection: "column",
      border: "1px solid #ffcb003d",
      alignContent: "center",
      alignItems: "center",
      padding: "28px 15px",
      margin: "25px 7px",
      color: "brown",
      background: "linear-gradient(119deg, #ffeaca, #17ffd005)",
    },
    h1: {
      display: "block",
      fontStyle: "italic",
      color: "blue",
    },
    img: {
      height: 200,
      margin: "0 10px",
    },
    attribute: {
      fontSize: "10px",
      color: "blue",
    },
    h3: {
      fontFamily: "sans-serif",
    },
    itemValues: {
      color: "#b56a00",
      fontSize: "1.4rem",
    },
  });

  const classes = useStyles();
  if (!props.species) {
    return null;
  }
  let filteredArr = anthroData.filter((item) => props.species === item.species);
  let imageMap = filteredArr.map((item, index) => {
    return (
      <div className={classes.photoGalleryComp}>
        <img
          key={index}
          src={item.linksToPhotos[0]}
          alt={item.species}
          className={classes.img}
        />
        <div className={classes.attribute}>
          {ReactHtmlParser(item.linksToPhotos[1])}
        </div>
        <h3 className={classes.itemField}>
          Name: <span className={classes.itemValues}>{item.name}</span>
        </h3>
        <h3 className={classes.itemField}>
          Location: <span className={classes.itemValues}>{item.city}</span>
        </h3>
        <h3 className={classes.itemField}>
          Country: <span className={classes.itemValues}>{item.country}</span>
        </h3>
        <h3 className={classes.itemField}>
          Continent:{" "}
          <span className={classes.itemValues}>{item.continent}</span>
        </h3>
        <h3 className={classes.itemField}>
          Estimated Time Period:{" "}
          <span className={classes.itemValues}>{item.date}</span>
        </h3>
      </div>
    );
  });
  return imageMap;
};

const TitleGalleryComp = (props) => {
  let currentSpecies = null;
  const { expanded, handleChange } = props;

  const Accordion = withStyles({
    root: {
      border: "3px solid blanchedalmond",
      boxShadow: "none",
      backgroundColor: "#d5e9ff4f",
      "&:not(:last-child)": {
        borderBottom: 0,
      },
      "&:before": {
        display: "none",
      },
      "&$expanded": {
        margin: "auto",
      },
    },
    expanded: {},
  })(MuiAccordion);

  const AccordionSummary = withStyles({
    root: {
      borderBottom: "1px solid rgba(0, 0, 0, .125)",
      marginBottom: -1,
      minHeight: 56,
      backgroundColor: "beige",
      "&$expanded": {
        minHeight: 56,
      },
    },
    content: {
      "&$expanded": {
        margin: "12px 0",
      },
    },
    expanded: {},
  })(MuiAccordionSummary);

  const AccordionDetails = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
      flexWrap: "wrap",
    },
  }))(MuiAccordionDetails);

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

  return anthroData.map((item, index) => {
    if (!currentSpecies) {
      currentSpecies = item.species;
      return (
        <Accordion
          square
          expanded={expanded === `panel${index + 1}`}
          onChange={handleChange(`panel${index + 1}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index + 1}d-content`}
            id={`panel${index + 1}d-header`}
          >
            {/* <div key={index} className={classes.titleGalleryComp}> */}
            <h1 className={classes.h1}>{item.species}</h1>
          </AccordionSummary>
          <AccordionDetails>
            <PhotoGalleryComp species={item.species} />
          </AccordionDetails>
          {/* </div> */}
        </Accordion>
      );
    } else if (item.species !== currentSpecies) {
      currentSpecies = item.species;
      return (
        // <div key={index} className={classes.titleGalleryComp}>
        <Accordion
          square
          expanded={expanded === `panel${index + 1}`}
          onChange={handleChange(`panel${index + 1}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index + 1}d-content`}
            id={`panel${index + 1}d-header`}
          >
            {/* <div key={index} className={classes.titleGalleryComp}> */}
            <h1 className={classes.h1}>{item.species}</h1>
          </AccordionSummary>
          <AccordionDetails>
            <PhotoGalleryComp species={item.species} />
          </AccordionDetails>
          {/* </div> */}
        </Accordion>
        // </div>
      );
    } else {
      return null;
    }
  });
};

export const HumanGallery = () => {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <TitleGalleryComp
        expanded={expanded}
        setExpanded={setExpanded}
        handleChange={handleChange}
      />
    </div>
  );
};
