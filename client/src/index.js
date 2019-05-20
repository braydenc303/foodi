// gives us access to react functionality
import React from "react";
// This package serves as the entry point to the DOM and server renderers for React. It is intended to be paired with the generic React package, which is shipped as react to npm.
import ReactDOM from "react-dom";
// imports our complete single-page app
import App from "./App";
// and renders it to the root div of the index.html located in the public folder.
ReactDOM.render(<App />, document.getElementById("root"));
