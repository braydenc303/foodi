// gives us access to react functionality.
import React from "react";
// here we import the css file that is specific to this component.
import "./style.css";

// This file exports both the List and ListItem components
// Here we have to pass in children in order to allow the component to display the dynamic values that we get back from the database call. In this case children will be all of the list items.
// The classNames that we have provided allow us to use specific styling for these elements. The css file for this is contained within the same folder as the componenent.
export function List({ children }) {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">{children}</ul>
    </div>
  );
}
// Here we have to pass in children in order to allow the component to display the dynamic values that we get back from the database call. In this case, children will be the link to the detail page for each book along with it's delete button.
export function ListItem({ children }) {
  return <li className="list-group-item">{children}</li>;
}
