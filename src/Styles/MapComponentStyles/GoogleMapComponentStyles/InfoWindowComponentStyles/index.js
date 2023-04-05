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
  width: "100%",
  textAlign: "center",
};

export const infoWindowImageContainer = {};

export const infoWindowImageStyles = {
  width: { xs: "25%", md: "50%" },
  maxHeight: "200px",
  borderRadius: 2,
  margin: "0 auto",
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
  gridTemplateColumns: "repeat(4,auto)",
  gridColumnGap: { xs: 5, sm: 48 },
  alignItems: "start",
};

export const infoWindowLabelFieldStyles = {
  color: "#f5f5dc",
  boxShadow: "rgb(215 136 0 / 8%) 10px 2px 20px 5px",
  backgroundColor: "rgb(215 136 0 / 8%)",
  fontSize: { xs: 18, lg: 18 },
  fontWeight: 500,
  pl: 1,
};

export const infoWindowTextFieldStyles = {
  color: "rgb(215, 136, 0)",
  fontSize: { xs: 20, lg: 18 },
  fontFamily: (theme) => theme.fonts.Kalam,
  whiteSpace: "nowrap",
  gridColumn: "2/5",
};

export const descriptionLabelStyle = {
  gridColumn: "1/5",
};

export const descriptionTextStyle = {
  whiteSpace: "break-spaces",
  gridRowStart: "2",
  gridColumn: "1/5",
  textAlign: "center",
};

export const individualFieldContainerStyle = {
  gridColumnGap: 0,
  gridRowGap: 3,
  gridTemplateRows: "2",
  justifyItems: "center",
};

export const imageAttributionLabelStyles = {
  color: (theme) => theme.palette.primary.main,
};

export const imageAttributionLinkStyles = {
  color: "#fff",
};
