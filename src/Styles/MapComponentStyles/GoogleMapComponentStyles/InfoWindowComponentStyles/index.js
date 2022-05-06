import { savannah } from "../../../../Media/InfoWindowMedia";

export const infoWindowMainContainerStyles = {
  "&.gm-style, &.gm-style-iw-d::-webkit-scrollbar-track, &.gm-style &.gm-style-iw-d::-webkit-scrollbar-track-piece":
    {
      background: "red",
      padding: "0px !important",
    },
};

export const infoWindowContainerStyles = {
  display: "grid",
  backgroundImage: `url(${savannah})`,
  backgroundSize: "cover",
  position: "relative",
  isolation: "isolate",
  justifyItems: "center",
  rowGap: { xs: 2, sm: 2 },
  "&:after": {
    content: "''",
    backgroundColor: "#000000b5",
    position: "absolute",
    inset: 0,
    zIndex: -1,
  },
};

export const infoWindowTitleText = {
  color: (theme) => theme.palette.primary.main,
  textShadow: "7px 6px 2px rgb(0 0 0 / 40%)",
  fontSize: { xs: 20, lg: 40 },
  fontWeight: "bold",
};

export const infoWindowImageContainer = {};

export const infoWindowImageStyles = {
  width: { xs: "25%", md: "50%" },
  borderRadius: 2,
};

export const infoWindowFieldsContainerStyles = {
  display: "grid",
  backgroundColor: "#ffe4c447",
  fontWeight: "bold",
  borderRadius: 1,
  boxShadow: "inset 1px 1px 19px 5px rgb(213 152 0 / 8%)",
  border: "5px rgb(255 255 255 / 24%)",
  borderStyle: "ridge",
  my: { xs: 3 },
  mx: { xs: 0 },
};

export const infoWindowIndividualFieldsContainer = {
  display: "grid",
  gridTemplateColumns: "auto auto",
  gridColumnGap: { xs: 5, sm: 48 },
  justifyContent: { xs: "space-evenly", sm: "center" },
  alignItems: "center",
  width: { xs: "100%", md: "50%" },
};

export const infoWindowLabelFieldStyles = {
  color: "#f5f5dc",
  boxShadow: "rgb(215 136 0 / 8%) 10px 2px 20px 5px",
  backgroundColor: "rgb(215 136 0 / 8%)",
  fontSize: { xs: 18, lg: 30 },
  fontWeight: 500,
};

export const infoWindowTextFieldStyles = {
  color: "rgb(215, 136, 0)",
  fontSize: { xs: 20, lg: 40 },
  fontFamily: (theme) => theme.fonts.Kalam,
  whiteSpace: "nowrap",
};
