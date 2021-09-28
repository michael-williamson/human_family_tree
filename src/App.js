import React, { Suspense, lazy } from "react";
import "./App.css";

import { Switch, Route } from "react-router";
// import { FossilGalleryComponent } from "./components/fossilGalleryComponents/FossilGalleryComponent";
// import { HumanGallery } from "./components/HumanGallery";
// import { MapPage } from "./components/mapComponents/MapPage";
import FullWidthTabs from "./components/reusableComponents/MuiTabsComp";
import { Container } from "@material-ui/core";
// import Button from "@material-ui/core/Button";

const MapPage = lazy(() => import("./components/mapComponents/MapPage.js"));
const FossilGalleryComponent = lazy(() =>
  import("./components/fossilGalleryComponents/FossilGalleryComponent.js")
);

function App() {
  return (
    <div className="App">
      <Container
        maxWidth={false}
        style={{ backgroundColor: "white", outline: "4px solid white" }}
        disableGutters={true}
      >
        <div className="header_container">
          <h1 className="header_title">Human Family Tree</h1>
          <FullWidthTabs />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/">
              <MapPage />
            </Route>
            <Route exact path="/fossil_gallery">
              <FossilGalleryComponent />{" "}
            </Route>
            {/* <Route exact path="/" component={Main} /> */}
          </Switch>
        </Suspense>
      </Container>
    </div>
  );
}

export default App;
