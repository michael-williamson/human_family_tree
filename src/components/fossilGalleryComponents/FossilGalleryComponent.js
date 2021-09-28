import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import anthroData from "../../data/anthroData.json";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { GalleryItemComponent } from "./GalleryItemComponent";
import { speciesArr } from "../../data/listArrays";
import theme from "../../theme";
import ExpandMore from "@material-ui/icons/ExpandMore";

const populateSpeciesObject = () => {
  const speciesObject = {};
  anthroData.forEach((item) => {
    if (speciesObject[item.species]) {
      speciesObject[item.species].push(item);
    } else {
      speciesObject[item.species] = [];
      speciesObject[item.species].push(item);
    }
  });
  return speciesObject;
};

const speciesObject = populateSpeciesObject();

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    color: theme.palette.primary.main,
    boxShadow: "none",
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
    background: "linear-gradient(45deg, rgb(251 255 186 / 65%), #fff00426)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
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
  },
}))(MuiAccordionDetails);

function Item() {
  const [expanded, setExpanded] = React.useState("panel1");
  const [itemsToRender, setItemsToRender] = useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleClick = (item) => (event) => {
    setItemsToRender(item);
  };

  const GridGalleryItemProps = {
    container: true,
    direction: "row",
    justifyContent: "space-evenly",
    spacing: 4,
  };

  return speciesArr.map((item, index) => {
    return (
      <div key={index}>
        <Accordion
          square
          expanded={expanded === `panel${index + 100}`}
          onChange={handleChange(`panel${index + 100}`)}
          onClick={handleClick(item)}
        >
          <AccordionSummary
            aria-controls={`panel${index + 100}d-content`}
            id={`panel${index + 100}d-header`}
            expandIcon={<ExpandMore color="primary" />}
          >
            {item}
          </AccordionSummary>
          <AccordionDetails>
            <Grid {...GridGalleryItemProps}>
              <GalleryItemComponent
                arr={speciesObject[item]}
                item={item}
                itemsToRender={itemsToRender}
              />
            </Grid>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  });
}

const FossilGalleryComponent = () => {
  return (
    <div>
      <Item />
    </div>
  );
};

export default FossilGalleryComponent;
