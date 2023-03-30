export const mapContainerStyles = {
  position: "relative",
  border: "7px solid rgb(215, 136, 0)",
};

export const showMapKeyButtonStyles = {
  position: "absolute",
  top: 10,
  right: 68,
  border: (theme) => `1px solid ${theme.palette.primary.main}`,
  fontSize: { xs: 10, md: 18, lg: 16 },
  color: "white",
  width: { lg: 150 },
};
