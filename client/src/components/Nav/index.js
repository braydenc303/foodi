// gives us access to react functionality.
import React from "react";
// Here we create a stateless Nav component that only has one link to our home page.
function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        foodi:
      </a>
      <a className="navbar-brand" href="/fnbs">
        Tasting Notes
      </a>
      <a className="navbar-brand" href="/entries">
        Food Diary
      </a>
      <a className="navbar-brand" href="/signup">Login</a> 
    </nav>
  );
}
// Here we export the Nav component to be used in building our app in App.js
export default Nav;
