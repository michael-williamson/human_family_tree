export const drawingManagerContainerStyles = {
  px: 2,
  py: 3,
  bgcolor: (theme) => theme.palette.customColors.darkBG,
  borderRadius: 1,
  position: "absolute",
  top: 0,
  left: -300,
  transition: "transform 200ms linear",
  transformOrigin: "top left",
  width: "max-content",
  cursor: "pointer",
  ":hover .windowMoveIcon": {
    opacity: 1,
  },
};

export const windowMoveIconContainer = {
  position: "absolute",
  top: -20,
  right: 0,
  left: 0,
  mx: "auto",
  cursor: "pointer",
  width: "min-content",
  opacity: 0,
  transition: "opacity 500ms",
  display: "flex",
  alignItems: "center",
};

export const windowMoveIconText = {
  fontSize: 14,
  fontWeight: 700,
  backgroundColor: (theme) => theme.palette.customColors.aqua,
  width: "max-content",
  px: 1 / 2,
  py: "1px",
  fontFamily: "sans-serif",
  borderRadius: 1,
};

export const drawingManagerTitleContainerStyles = {
  pb: 1,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: (theme) => theme.palette.customColors.beige,
  textAlign: "center",
};

export const drawingManagerTitleStyles = {
  fontSize: 30,
  fontWeight: "bold",
  color: "primary.main",
  fontFamily: (theme) => theme.fonts.Kalam,
};

export const drawingManagerTitleIconStyles = {
  width: 50,
};

export const drawingManagerInputsContainerStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  columnGap: 4,
  rowGap: 4,
  pt: 2,
};

export const drawingManagerLabelStyles = {
  fontSize: 20,
  fontWeight: "bold",
  textAlign: "center",
  color: "white",
  fontFamily: "Roboto",
  pb: 2,
};

export const radioGroupStyles = {
  backgroundColor: (theme) => theme.palette.customColors.beige,
  px: 2,
  py: 2,
  borderRadius: 1,
};
