export const animationContainerStyles = {
  position: "relative",
  width: "50%",
  background: (theme: { palette: { customColors: { darkBG: any } } }) =>
    theme.palette.customColors.darkBG,
  zIndex: "1000",
  padding: "20px 20px",
  border: "1px solid orange",
  borderRadius: 5,
  height: "45px",
};

export const progressBarStyles = {
  position: "relative",
};

export const slotElementStyles = {
    color: "orange",
    position: "absolute",

    top: "30px",
    fontWeight: "bold",
}

export const startButtonStyles = {
  top: "20px",
  background: "black",
  border: "1px",
  solid: " orange",
  borderRadius: "10px",
};
