import React from "react";
import { withStyles } from "@material-ui/core/styles";
import theme from "../../theme";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const AccordionComp = (props) => {
  const {
    expanded,
    setExpanded,
    index,
    children: { AccordionSummaryChild, AccordionDetailsChild },
  } = props;

  const Accordion = withStyles({
    root: {
      boxShadow: "none",
      color: theme.palette.main,
      margin: theme.spacing(1, 0),
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
      padding: theme.spacing(1, 2, 5),
    },
  }))(MuiAccordionDetails);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        square
        expanded={expanded === `panel${index + 1}`}
        onChange={handleChange(`panel${index + 1}`)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="primary" />}
          aria-controls={`panel${index + 1}d-content`}
          id={`panel${index + 1}d-header`}
        >
          {AccordionSummaryChild}
        </AccordionSummary>
        <AccordionDetails>{AccordionDetailsChild}</AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionComp;
