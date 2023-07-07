import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

if (typeof window !== "undefined") {
  window.React = React;
}

ReactDOM.render(<App />, document.getElementById("root"));
