export const individualSpecimenContainer = (link) => {
  const borderRadiusProp = 1;
  return {
    backgroundImage: `url(${link})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: { xs: "cover", lg: "100% 100%" },
    position: "relative",
    isolation: "isolate",
    borderRadius: borderRadiusProp,
    width: { xs: "100%", md: "50%", lg: "25%" },
  };
};

export const imageViewIconStyles = {
  position: "absolute",
  top: 5,
  left: 5,
  width: 50,
  height: 50,
  zIndex: 1000,
  color: (theme) => theme.palette.customColors?.beige,
  cursor: "pointer",
};

export const individualSpecimenFieldsContainerFN = (opacity) => {
  const newOpacity = opacity ? 1 : 0;
  return {
    display: "grid",
    gridGap: 25,
    py: { xs: 3 },
    backgroundColor: `rgb(0 0 0 / ${65}%)`,
    opacity: newOpacity,
    transition: "opacity 300ms",
  };
};

export const individualSpecimenFields = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const specimenLabelStyles = {
  fontWeight: "bold",
  fontSize: 20,
  fontFamily: "monospace",
  color: (theme) => theme.palette.primary?.contrastText,
};

export const specimenInfoStyles = {
  fontWeight: "bold",
  fontSize: 30,
  fontFamily: (theme) => theme.fonts?.Caveat,
  color: (theme) => theme.palette.primary?.main,
};

export const moreInfoLinkStyles = {
  fontSize: 24,
};
