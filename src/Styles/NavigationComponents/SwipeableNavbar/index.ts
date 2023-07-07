import theme from "../../../theme";

export const swipeableDrawerStyles = {
  width: "100%",
  "& .MuiPaper-root.MuiDrawer-paper": {
    width: { xs: "75%" },
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    gridTemplateRows: "repeat(8,auto)",
    backgroundColor: (theme: { palette: { customColors: { swipeableNavBG: any; }; }; }) => theme.palette.customColors.swipeableNavBG,
  },
};

export const navLinkContainerStyles = {
  display: "grid",
  gridTemplateColumns: "auto auto",
  justifyContent: "space-between",
  columnGap: 4,
};

// NavLinks is apart of the react-router library and doesn't receive theme as a prop like Material UI components
// To remedy this, theme was imported
export const navLinkStyles = {
  textDecoration: "none",
  color: theme.palette.primary.main,
  fontFamily: theme.fonts.Kalam,
  fontSize: 30,
};

export const navLinkIconStyles = {
  width: 48,
};
