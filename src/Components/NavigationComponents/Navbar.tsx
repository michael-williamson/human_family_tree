import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";
import {
  navbarContainer,
  navLinkStyles,
} from "../../Styles/NavigationComponents/NavBar";
import { routesArrayProperties, routesArrayValues } from "../../Routes/routes";

export const Navbar = () => {
  return (
    <Box sx={navbarContainer}>
      {routesArrayProperties.map((item, index) => (
        <NavLink to={routesArrayValues[index]} style={navLinkStyles} key={item}>
          {item}
        </NavLink>
      ))}
    </Box>
  );
};
