import React, { useState } from "react";
import { Grid, Box } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import speciesArrays from "../../data/speciesArrays.json";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import GalleryItemComponent from "./GalleryItemComponent";
import { speciesArr } from "../../data/listArrays";
import theme from "../../theme";
import ExpandMore from "@material-ui/icons/ExpandMore";
import NearMeOutlinedIcon from "@material-ui/icons/NearMeOutlined";

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
    background: theme.palette.background.default,
  },
}))(MuiAccordionDetails);

function Item(props) {
  const [itemToRender, setItemToRender] = useState(null);
  const { expanded, setExpanded } = props;

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleClick = (item) => (event) => {
    setItemToRender(item);
  };
  const GridGalleryItemProps = {
    container: true,
    item: true,
    direction: "row",
    justifyContent: "space-evenly",
    spacing: 4,
  };

  return speciesArr.map((item, index) => {
    return (
      <Accordion
        square
        key={index}
        expanded={expanded === `panel${index + 100}`}
        onChange={handleChange(`panel${index + 100}`)}
      >
        <AccordionSummary
          aria-controls={`panel${index + 100}d-content`}
          id={`panel${index + 100}d-header`}
          expandIcon={<ExpandMore color="primary" />}
          onClick={handleClick(item)}
        >
          <Box fontStyle="italic">{item}</Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid {...GridGalleryItemProps}>
            <GalleryItemComponent
              arr={speciesArrays[item]}
              item={item}
              itemToRender={itemToRender}
            />
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  });
}

const FossilGalleryComponent = () => {
  const [expanded, setExpanded] = useState("panel1");

  return (
    <div>
      <Box color="primary.main" px={2} py={2} bgcolor="background.default">
        <Box variant="h2" fontSize={25}>
          <NearMeOutlinedIcon />
          Click any tab to open
        </Box>
        <Box fontStyle="italic" variant="p" py={2}>
          features specimens of the world with geographical and dating data
        </Box>
      </Box>
      <Item expanded={expanded} setExpanded={setExpanded} />
    </div>
  );
};

export default FossilGalleryComponent;
