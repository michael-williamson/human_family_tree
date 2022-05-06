import React, { useState } from "react";
import { routesArrayProperties, routesArrayValues } from "../../Routes/routes";
import { SwipeableDrawerComponent } from "../ReusableComponents/SwipeableDrawerComponent";
import { NavLink } from "react-router-dom";
import { CardMedia, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { Menu } from "@mui/icons-material";
import {
  navLinkContainerStyles,
  navLinkIconStyles,
  navLinkStyles,
  swipeableDrawerStyles,
} from "../../Styles/NavigationComponents/SwipeableNavbar";
import { routesIcons } from "../../HelperFunctions/Routes";

export const SwipeableNavbar = (props) => {
  const [open, setOpen] = useState(false);
  const { buttonStyles } = props;

  const handleChange = (bool) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(bool);
  };

  const NavLinks = routesArrayProperties.map((item, index) => (
    <Box sx={navLinkContainerStyles} key={item}>
      <NavLink
        key={item}
        to={routesArrayValues[index]}
        style={navLinkStyles}
        onClick={handleChange(false)}
      >
        {item}
      </NavLink>
      <CardMedia
        src={routesIcons[`${item}`]}
        component="img"
        sx={navLinkIconStyles}
      />
    </Box>
  ));

  return (
    <>
      <IconButton sx={buttonStyles} onClick={handleChange(!open)}>
        <Menu />
      </IconButton>
      <SwipeableDrawerComponent
        anchor="left"
        open={open}
        onClose={handleChange(false)}
        onOpen={(e) => null}
        sx={swipeableDrawerStyles}
      >
        {NavLinks}
      </SwipeableDrawerComponent>
    </>
  );
};
