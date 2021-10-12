import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import { skull_icon } from "../media";
import { globe_icon } from "../media";

const navLinkStyles = {
  color: "beige",
  textDecoration: "none",
  padding: "18px 65px",
  fontWeight: 900,
  position: "relative",
  borderRadius: "21px 21px 1px 1px",
  textShadow: "-4px -1px 0px #434343",
  backgroundColor: "#00000038",
};

const navLinkPseudoBefore = {
  top: 0,
  left: 0,
  position: "absolute",
  filter: "drop-shadow(2px 4px 6px black)",
};

const useStyles = makeStyles((theme) => ({
  navLinkContainer: {},
  navLink: {
    ...navLinkStyles,
    "&:before": {
      content: `url(${globe_icon})`,
      ...navLinkPseudoBefore,
    },
  },
  navLink2: {
    ...navLinkStyles,
    "&:before": {
      content: `url(${skull_icon})`,
      ...navLinkPseudoBefore,
    },
  },
  activeLink: {
    borderBottom: "6px solid beige",
    color: "beige",
  },
  imgIcon: {
    width: 20,
    height: 20,
  },
}));

export const Navbar = () => {
  const classes = useStyles();
  return (
    <Grid container item xs={12} alignItems="center" justifyContent="center">
      <Grid
        container
        item
        className={classes.navLinkContainer}
        xs={12}
        lg={4}
        justifyContent="center"
      >
        <NavLink
          to="/map"
          className={classes.navLink}
          activeClassName={classes.activeLink}
        >
          Prehistory Map
        </NavLink>
      </Grid>
      <Grid
        container
        item
        className={classes.navLinkContainer}
        xs={12}
        lg={4}
        justifyContent="center"
      >
        <NavLink
          to="/fossil_gallery"
          className={classes.navLink2}
          activeClassName={classes.activeLink}
        >
          Human Fossil Gallery
        </NavLink>
      </Grid>
    </Grid>
  );
};
