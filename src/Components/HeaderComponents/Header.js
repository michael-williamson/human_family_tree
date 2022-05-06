import React from "react";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { routes } from "../../Routes/routes";
import { Navbar } from "../NavigationComponents/Navbar";
import {
  headerContainerStyles,
  headerLinkTitleStyles,
  headerTitleStyles,
  swipeableDrawerButton,
} from "../../Styles/HeaderComponentStyles";
import { TextComponent } from "../ReusableComponents/TextComponent";
import { useMediaQuery } from "@mui/material";
import { SwipeableNavbar } from "../NavigationComponents/SwipeableNavbar";

export const Header = () => {
  const match = useMediaQuery("(max-width:991px)");
  return (
    <Box sx={headerContainerStyles}>
      <Link to={routes.Welcome} style={headerLinkTitleStyles}>
        <TextComponent styles={headerTitleStyles} text="Human Family Tree" />
      </Link>
      {match ? (
        <SwipeableNavbar buttonStyles={swipeableDrawerButton} />
      ) : (
        <Navbar />
      )}
    </Box>
  );
};
