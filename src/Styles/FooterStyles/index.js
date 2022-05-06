export const footerContainerStyles = (match) => {
  return {
    backgroundColor: (theme) => theme.palette.customColors.beige,
    color: "primary.main",
    height: 60,
    width: "100%",
    position: match ? "fixed" : "relative",
    bottom: 0,
    left: 0,
  };
};
