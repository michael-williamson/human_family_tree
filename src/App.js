import "./App.css";
// import { HumanGallery } from "./components/HumanGallery";
import { MapPage } from "./components/mapComponents/MapPage";
import FullWidthTabs from "./components/reusableComponents/MuiTabsComp";
// import Button from "@material-ui/core/Button";

function App() {
  return (
    <div className="App">
      <div className="header_container">
        <h1 className="header_title">Human Family Tree</h1>
        <FullWidthTabs />
      </div>

      <MapPage />
    </div>
  );
}

export default App;
