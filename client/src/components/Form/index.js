// gives us access to react functionality.
import React from "react";

// This file exports the Input, TextArea, and FormBtn components
// Here we create an input field that will take in props as well as pass the props on to any children
// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
export function Input(props) {
  return (
    <div className="form-group">
      <input className="form-control" {...props} />
    </div>
  );
}

// Here we create a Date field that will take in props as well as pass the props on to any children
// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
export function DatePicker(props) {
  return (
    <div className="form-group">
      <input type="date" className="form-control" {...props} />
    </div>
  )
}

// Here we create an text field that will take in props as well as pass the props on to any children
// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
export function TextArea(props) {
  return (
    <div className="form-group">
      <textarea className="form-control" rows="20" {...props} />
    </div>
  );
}
// Here we create a button that will take in props as well as pass the props on to any children, and use props.children as the text of the button.
// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
export function FormBtn(props) {
  return (
    <button {...props} style={{ float: "right", marginBottom: 10 }} className="btn btn-success">
      {props.children}
    </button>
  );
}
