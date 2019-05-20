// gives us access to react functionality.
import React from "react";
// here we import the css file that is specific to this component.
import "./style.css";

// Here we create a button that will take in props
// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function DeleteBtn(props) {
  console.log(props);
  return (
    <span className="delete-btn" {...props} role="button" tabIndex="0">
      ✗
    </span>
  );
}
// We then export the component to be used in other components or pages.
export default DeleteBtn;
