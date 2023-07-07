import {Theme,ThemeOptions, Palette,PaletteOptions } from "@mui/material/styles";

declare module '@mui/material/styles' {
  interface Theme {
    fonts:any;
    status:any;
  }
  interface ThemeOptions {
    fonts?:any;
    status?:any;
  }
    interface Palette {
      customColors: any;

    }
    // allow configuration using `createTheme`
    interface PaletteOptions {
        customColors?: any;
        // customColors?: {
        //   [key : string]: string;
        // };
      }
  }
  
  