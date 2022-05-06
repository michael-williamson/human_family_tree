export const welcomeContainerStyles = {
  display: "grid",
  rowGap: 3,
};

export const welcomePageTitleContainerStyles = {
  display: "grid",
  justifyItems: "center",
};

export const welcomePageTitleStyles = {
  fontSize: 60,
};

export const welcomeMessageTextStyles = {
  color: "primary.main",
  fontFamily: (theme) => theme.fonts.Kalam,
  textAlign: "center",
  fontSize: 21,
  fontWeight: "bold",
  lineHeight: { xs: 2 },
  py: { xs: 1 },
  px: { xs: 1 },
  borderRadius: 3,
  background:
    "linear-gradient(45deg, rgb(255 218 36 / 50%), transparent,rgb(255 245 50 / 48%))",
};
