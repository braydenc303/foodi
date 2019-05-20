// gives us access to react functionality.
import React from "react";
// Here we have to pass in children in order to allow the component to display the values that we enter on the pages where this component is called. In this case children will typically be the headings of each section.
function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 300, clear: "both", paddingTop: 120, textAlign: "center" }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}
// We must then export the component to be used in pages.
export default Jumbotron;
