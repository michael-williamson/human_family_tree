import {
  chartsIcon,
  galleryIcon,
  homeIcon,
  mapIcon,
} from "../Media/PageTitle_Navigation_Icons/index";

export const routes = {
  Welcome: "",
  Map: "Map",
  Gallery: "Gallery",
  Charts: "Charts",
};

export const routesIcons = {
  Welcome: homeIcon,
  Map: mapIcon,
  Gallery: galleryIcon,
  Charts: chartsIcon,
};

export const routesArrayProperties = Object.keys(routes);
export const routesArrayValues = Object.values(routes);
