import { HeaderBGImage, HeaderTitleBGImage } from "../../Media/HeaderMedia";

export const headerContainerStyles = {
  position: "relative",
  backgroundImage: `url(${HeaderBGImage})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  pt: { xs: 1 },
  pb: { xs: 11, md: 0 },
  display: "grid",
  justifyItems: "center",
  rowGap: { md: 5 },

  isolation: "isolate",
  "&::after": {
    content: "''",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundColor: "rgb(0 0 0 / 21%)",
  },
};

export const headerLinkTitleStyles = {
  textDecoration: "none",
};

export const headerTitleStyles = {
  color: (theme) => theme.palette.customColors.beige,
  display: "flex",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "-20px -3px",
  backgroundImage: `url(${HeaderTitleBGImage})`,
  fontFamily: "sans-serif",
  position: "relative",
  zIndex: 1000,
  justifyContent: "center",
  alignItems: "center",
  fontSize: "3rem",
  margin: "0 auto",
  transform: "translateY(8px)",
  textShadow: " -3px -3px 0px #000000ad",
  textAlign: "center",
  minHeight: { lg: 100 },
  maxWidth: { xs: "", lg: 350 },
  minWidth: { xs: 288 },
};

export const swipeableDrawerButton = {
  position: "absolute",
  top: { xs: "68%" },
  border: (theme) => `3px solid ${theme.palette.customColors.menuButtonBorder}`,
  fontWeight: "bold",
  fontFamily: (theme) => theme.fonts.Kalam,
  color: (theme) => theme.palette.customColors.beige,
  borderRadius: 1,
  fontSize: { xs: 16 },
  px: { xs: 2 },
};
