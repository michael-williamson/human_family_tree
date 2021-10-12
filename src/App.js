import React, { Suspense, lazy } from "react";
import "./App.css";

import { Switch, Route, Redirect } from "react-router";
import { Container, CircularProgress } from "@material-ui/core";
import { Navbar } from "./components/Navbar";

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
          <Navbar />
        </div>
        <Suspense fallback={<CircularProgress />}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/map" />
            </Route>
            <Route exact path="/map">
              <MapPage />
            </Route>
            <Route exact path="/fossil_gallery">
              <FossilGalleryComponent />
            </Route>
            <Route path="/">
              <div>No Match</div>
            </Route>
          </Switch>
        </Suspense>
      </Container>
    </div>
  );
}

export default App;
