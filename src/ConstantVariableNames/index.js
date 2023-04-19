// constants concerning json properties & map key fields & names
const DATES = "dates";
const SPECIES = "species";
const OVERLAYS = "overlays";
const CITY = "city";
const COUNTRY = "country";
const CONTINENT = "continent";
const DATE = "date";
const LINK_TO_INFO = "linkToInfo";

// event constants
const MOUSE_ENTER = "mouseenter";
const MOUSE_LEAVE = "mouseleave";

// general map key constants
const SELECT_ALL = "select all";
const DESELECT_ALL = "deselect all";
const SINGLE_SELECTION = "single selection";
const SORT_BY_SPECIES = "Sort by Species";
const SORT_BY_DATES = "Sort by Dates";
const OVERLAYS_CAPITALIZED = "Overlays";
const UPDATING_INDIVIDUAL = "updating individual";
const EVENTS_CAPITALIZED = "Events";
const EVENTS = "events";
const POINTS_OF_INTEREST = "points of interest";
const POINTS_OF_INTEREST_CAPITALIZED = "Points of Interest";
const EVENT_NAME = "eventName";
const ENTRY_EXIT_POINTS = "entryExitPoints";
const ENTRY_EXIT_POINTS_TITLE = "Entry & Exit Points";

// info window constants
const CLOSE_INFO_WINDOW = "close info window";
const OPEN_INFO_WINDOW = "open info window";

// google map constants
const SATELLITE = "satellite";
const HYBRID = "hybrid";
const ROADMAP = "roadmap";

const DESCRIPTION = "description";

// constants for managing state
const ADD = "add";
const ADD_INDIVIDUAL = "add individual";
const SUBTRACT = "subtract";
const ACTIVE_FIELD = "active field";
const ACTIVE_KEY = "active key";

// consistent object property names for iterations etc...
const ITEM = "item";
const PROP_NAME = "propName";
const INDIV_PROP_NAME = "indivPropName";

let STATE_PROP_NAME;

// relative url / api routes
const SPECIMENS_ARRAY = "specimensArray";
const SPECIMENS_BY_DATE = "specimensByDate";
const SPECIMENS_BY_SPECIES = "specimensBySpecies";
const SPECIMENS_BY_ID = "specimensById";
const EVENT_ARRAY = "events";
const OVERLAY_ARRAY = "overlays";
const ENTRY_EXIT_POINTS_ARRAY = "entryExitPoints";

// remote server constants
const REMOTE_SERVER_BASE_URL =
  "https://human-family-tree-server.herokuapp.com/";
const LOCAL_SERVER_BASE_URL = "http://localhost:5000/";

export {
  DATES,
  SPECIES,
  OVERLAYS,
  MOUSE_ENTER,
  MOUSE_LEAVE,
  SELECT_ALL,
  DESELECT_ALL,
  SINGLE_SELECTION,
  SORT_BY_SPECIES,
  SORT_BY_DATES,
  OVERLAYS_CAPITALIZED,
  UPDATING_INDIVIDUAL,
  EVENTS_CAPITALIZED,
  EVENTS,
  OPEN_INFO_WINDOW,
  CLOSE_INFO_WINDOW,
  POINTS_OF_INTEREST,
  POINTS_OF_INTEREST_CAPITALIZED,
  SATELLITE,
  ROADMAP,
  HYBRID,
  CITY,
  COUNTRY,
  CONTINENT,
  DATE,
  DESCRIPTION,
  EVENT_NAME,
  ENTRY_EXIT_POINTS,
  ENTRY_EXIT_POINTS_TITLE,
  ADD,
  ADD_INDIVIDUAL,
  SUBTRACT,
  ACTIVE_FIELD,
  ACTIVE_KEY,
  INDIV_PROP_NAME,
  PROP_NAME,
  ITEM,
  STATE_PROP_NAME,
  LINK_TO_INFO,
  REMOTE_SERVER_BASE_URL,
  LOCAL_SERVER_BASE_URL,
  SPECIMENS_ARRAY,
  SPECIMENS_BY_DATE,
  SPECIMENS_BY_SPECIES,
  SPECIMENS_BY_ID,
  EVENT_ARRAY,
  OVERLAY_ARRAY,
  ENTRY_EXIT_POINTS_ARRAY,
};
