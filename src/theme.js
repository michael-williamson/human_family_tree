import { createTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      //orangish color
      main: "rgb(215, 136, 0)",
      //almost blanched almond
      contrastText: "rgb(244, 255, 197)",
    },
    secondary: {
      //brown
      // main: "#a52a2a",
      main: "#bc5829",
    },
    error: {
      main: red.A400,
    },
    info: {
      main: "#fffcaa",
      //lighter beige
      light: "#f2ef89",
    },
    background: {
      //beige
      default: "#f5f5dc",
    },
  },
});

theme.typography.h5 = {
  fontSize: "1rem",
};

theme.typography.h4 = {
  fontSize: "1.5rem",
};

export default theme;
