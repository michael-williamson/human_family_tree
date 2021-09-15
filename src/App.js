import { useState } from "react";
import "./App.css";
import { HumanGallery } from "./components/HumanGallery";
import { MapPage } from "./components/MapPage";

function App() {
  const [showMap, setShowMap] = useState(true);
  return (
    <div className="App">
      <h1>Human Family Tree</h1>
      <button onClick={() => setShowMap(false)}>Show Fossils</button>
      <button onClick={() => setShowMap(true)}>Show Map</button>
      {!showMap ? <HumanGallery /> : <MapPage />}
    </div>
  );
}

export default App;
