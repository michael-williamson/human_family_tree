export const mapKeyContainerStyles = {
  position: "absolute",
  right: 10,
  top: 100,
  backgroundColor: "rgb(0 0 0 / 81%)",
  border: `1px solid white`,
  display: "grid",
  rowGap: 3,
  borderRadius: 3,
  maxHeight: 600,
  overflow: "hidden",
};

export const mapLegendTitleStyles = {
  color: "primary.main",
  bgcolor: (theme) => theme.palette.customColors.beige,
  fontSize: { xs: 31 },
  fontWeight: "bold",
  textAlign: "center",
  pb: { xs: 0 },
  fontFamily: (theme) => theme.fonts.Kalam,
  borderRadius: "8px 8px 0px 0px",
};

export const allIndividualKeysContainer = {
  overflowY: "scroll",
  maxHeight: 400,
  display: "grid",
  rowGap: 5,
  pb: { xs: 5, md: 5 },
  "&::-webkit-scrollbar": {
    width: { xs: 5 },
  },
  "&::-webkit-scrollbar-track": {},
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "orange",
    borderRadius: 5,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "darkorange",
  },
};

export const checkboxListContainerStyles = {
  px: { xs: 3 },
};

export const titleTextStyles = {
  color: "white",
  fontSize: { xs: 20 },
  fontFamily: "sans-serif",
  cursor: "pointer",
};

export const showListButtonStyles = {
  fontSize: 25,
  color: "white",
};

export const checkboxListStyles = {
  display: "grid",
  color: "white",
};

export const formControlStyles = {
  fontFamily: "cursive",
  "& .MuiFormControlLabel-label": {
    fontFamily: "cursive",
  },
};

export const checkboxStyles = {
  "& .MuiSvgIcon-root": {
    fill: "orange",
  },
};
