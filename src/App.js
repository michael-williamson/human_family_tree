import { useState } from "react";
import "./App.css";
import { HumanGallery } from "./components/HumanGallery";
import { MapPage } from "./components/mapComponents/MapPage";
import FullWidthTabs from "./components/reusableComponents/MuiTabsComp";
import theme from "./theme";
// import Button from "@material-ui/core/Button";

function App() {
  const [showMap, setShowMap] = useState(true);
  return (
    <div className="App">
      <div className="header_container">
        <h1 className="header_title">Human Family Tree</h1>
        <FullWidthTabs />
        {/* <div className="button_container">
          <Button
            onClick={() => setShowMap(false)}
            variant="contained"
            color="primary"
          >
            Show Fossils
          </Button>
          <Button
            onClick={() => setShowMap(true)}
            variant="contained"
            color="primary"
          >
            Show Map
          </Button>
        </div> */}
      </div>

      {!showMap ? <HumanGallery /> : <MapPage />}
    </div>
  );
}

export default App;
