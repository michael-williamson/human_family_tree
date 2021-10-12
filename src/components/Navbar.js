import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import { skull_icon } from "../media";
import { globe_icon } from "../media";

const useStyles = makeStyles((theme) => ({
  navLinkContainer: {},
  navLink: {
    // color: "#a52a2ab0",
    color: "beige",
    textDecoration: "none",
    // padding: "20px 70px",
    padding: "18px 65px",
    fontWeight: 900,
    position: "relative",
    // backgroundImage: "linear-gradient(185deg, #f5f5dc70, #fedb00ba, #f5f5dcfc)",
    // letterSpacing: 4,
    // fontSize: 22,
    borderRadius: "21px 21px 1px 1px",
    textShadow: "-4px -1px 0px #434343",
    backgroundColor: "#00000038",
    "&:before": {
      content: `url(${globe_icon})`,
      top: 0,
      left: 0,
      position: "absolute",
      filter: "drop-shadow(2px 4px 6px black)",
    },
  },
  navLink2: {
    color: "beige",
    textDecoration: "none",
    padding: "18px 65px",
    fontWeight: 900,
    position: "relative",
    // backgroundImage: "linear-gradient(185deg, #f5f5dc70, #fedb00ba, #f5f5dcfc)",
    // letterSpacing: 4,
    // fontSize: 22,
    borderRadius: "21px 21px 1px 1px",
    textShadow: "-4px -1px 0px #434343",
    backgroundColor: "#00000038",
    "&:before": {
      content: `url(${skull_icon})`,
      top: 0,
      left: 0,
      position: "absolute",
      filter: "drop-shadow(2px 4px 6px black)",
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
