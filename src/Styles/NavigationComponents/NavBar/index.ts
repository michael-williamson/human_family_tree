import { CSSProperties } from "react";
import theme from "../../../theme";

export const navbarContainer = {
  display: "flex",
  justifyContent: "space-around",
  width: "100%",
};

interface NavLinkTypes extends CSSProperties {
  [key:string]:any;
}

export const navLinkStyles:NavLinkTypes = {
  color: "beige",
  fontFamily: theme.fonts.Kalam,
  textDecoration: "none",
  padding: "18px 65px",
  fontWeight: 900,
  position: "relative",
  borderRadius: "21px 21px 1px 1px",
  textShadow: "-4px -1px 0px #434343",
  backgroundColor: "#00000038",
  "&:before": {
    content: `""`,
    top: 0,
    left: 0,
    position: "absolute",
    filter: "drop-shadow(2px 4px 6px black)",
  },
};
