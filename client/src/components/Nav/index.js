// gives us access to react functionality.
import React from "react";
import { Link } from "react-router-dom";
// Here we create a stateless Nav component that only has one link to our home page.
function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link className="navbar-brand" to="/landing">
        foodi:
      </Link>
      <Link className="navbar-brand" to="/users/userFnbs">
        Tasting Notes
      </Link>
      <Link className="navbar-brand" to="/users/userEntries">
        Food Diary
      </Link>
      <Link className="navbar-brand" to="/login">Login</Link> 
    </nav>
  );
}
// Here we export the Nav component to be used in building our app in App.js
export default Nav;
