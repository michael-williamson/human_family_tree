import {
  homeIcon,
  mapIcon,
  galleryIcon,
  chartsIcon,
  glossaryIcon,
} from "../../Media/PageTitle_Navigation_Icons";

export interface RouteIconsType {
  [key: string]: string;
}

export const routesIcons: RouteIconsType = {
  Welcome: homeIcon,
  Map: mapIcon,
  Gallery: galleryIcon,
  Charts: chartsIcon,
  Glossary: glossaryIcon,
};