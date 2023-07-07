import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

const googleFonts = {
  Caveat: "Caveat",
  GrapeNuts: "Grape Nuts",
  Kalam: "Kalam",
  LondrinaSolid: "Londrina Solid",
};

// text for copy-paste in chrome developer tools to view font family in browser
// font-family: 'Caveat', cursive;
// font-family: 'Grape Nuts', cursive;
// font-family: 'Kalam', cursive;
// font-family: 'Londrina Solid', cursive;

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      //orangish color
      main: "rgb(215, 136, 0)",
      //almost blanched almond
      contrastText: "rgb(244, 255, 197)",
      //variation of orange,  used on image outline
      light: "#c4760ba1",
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
      //darker beige
      main: "rgb(255 241 192)",
      //lighter beige
      light: "#f2ef89",
      //dark blue
      dark: "#02245a",
    },
    background: {
      //beige
      default: "#f5f5dc",
    },
    customColors: {
      beige: "#f5f5dc",
      chocolate: "#d2691e",
      swipeableNavBG: "#0e0e0ee6",
      menuButtonBorder: "#fffde1",
      aqua: "#00ffff",
      darkBG: "rgb(0 0 0 / 81%)",
    },
  },

  //end of palette
  fonts: {
    ...googleFonts,
  },
  status: {
    //cadet blue
    link: "#5f9ea0",
    //darker link
    darkerLink: "#1f9ed2",
    //click here link
    clickLink: "#b1fde3",
  },
});

theme.typography.h5 = {
  fontSize: "1rem",
};

theme.typography.h4 = {
  fontSize: "1.5rem",
};

export default theme;
