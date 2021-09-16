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
      //blue
      main: "#0095da",
    },
    error: {
      main: red.A400,
    },
    info: {
      main: "#fff",
    },
    background: {
      default: "#fff",
    },
  },
});

export default theme;
