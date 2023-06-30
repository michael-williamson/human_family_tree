export const mapKeyContainerStyles = {
  backgroundColor: "rgb(0 0 0 / 81%)",
  border: `1px solid white`,
  display: "grid",
  rowGap: 3,
  borderRadius: 3,
  maxHeight: 600,
  overflow: "hidden",
  width: { lg: 350 },
  visibility: "visible",
  mr: { lg: 3 },
};

export const mapLegendTitleContainerStyles = {
  bgcolor: theme => theme.palette.customColors.beige,
  borderRadius: "8px 8px 0px 0px",
  display: "flex",
  justifyContent: "center",
};

export const mapLegendTitleStyles = {
  color: "primary.main",
  fontSize: { xs: 31 },
  fontWeight: "bold",
  textAlign: "center",
  pb: { xs: 0 },
  fontFamily: theme => theme.fonts.Kalam,
};

export const mapLegendTitleImageContainer = {
  width: { xs: 50, lg: 50 },
  pl: { lg: 2 },
};

export const allIndividualKeysContainer = {
  overflowY: "scroll",
  maxHeight: 400,
  display: "grid",
  rowGap: 5,
  pb: { xs: 5, md: 5 },
  pl: { lg: 1 },
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

export const checkboxListContainer = {
  overflowY: "scroll",
  maxHeight: 400,
  display: "grid",
  rowGap: 5,
  pb: { xs: 5, md: 5 },
  pl: { lg: 1 },
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

export const searchByLabelsStyles = {
  color: "white",
  "&.Mui-focused": { color: "white" },
};

export const searchByRadioStyles = {
  color: theme => theme.palette.primary.main,
  "&.Mui-checked": { color: theme => theme.palette.primary.main },
};

export const searchResultsContainerStyles = {
  color: "white",
  cursor: "pointer",
  py: 1,
  display: "grid",
  gridTemplateColumns: "repeat(3,auto)",
};

export const searchResultsImageStyles = {
  width: 40,
  height: 40,
  borderRadius: 3,
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
  fontSize: { xs: "1rem" },
};

export const checkboxStyles = {
  "& .MuiSvgIcon-root": {
    fill: "orange",
  },
};
