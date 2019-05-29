// gives us access to react functionality
import React from "react";
// DOM bindings for React Router.
// BrowserRouter is a router implementation that uses the HTML5 history API
// Route updates the UI when a link is clicked.
// The <Switch> is not required for grouping <Route>s, but it can be quite useful. A <Switch> will iterate over all of its children <Route> elements and only render the first one that matches the current location. This helps when multiple route’s paths match the same pathname, when animating transitions between routes, and in identifying when no routes match the current location (so that you can render a “404” component).
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import in the books page
import Books from "./pages/Books";
// import in the detail page
import Detail from "./pages/Detail";
// import in the NoMatch page
import NoMatch from "./pages/NoMatch";
// import in the Nav component to be displayed with every page
import Nav from "./components/Nav";
// create a function called app that will display the proper components when a particular route is hit.
function App() {
  // Because a function can only return one thing, we return the router with the proper components inside.
  return (
    // wrapping all of our components in a router to render based upon the route hit.
      // Keeping our app wrapped within a div
        // Nav will display on all routes
        // Switch will display the proper page/component that matches the route provided.
        // "/" and "/books" will both display the Books component
        // "/books/:id" displays the Detail component with the book data that has a matching id to the one provided.
        // If we do not match any route, we will display a NoMatch page with a 404 error.
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Books} />
          <Route exact path="/books" component={Books} />
          <Route exact path="/books/:id" component={Detail} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}
// export app to be used in index.js
export default App;

// The following lines will be added to the switch once the components are complete

// This will display details for food and beverage
// <Route exact path="/fnbs/:id" component={Detail} />

// This will display details for diary entries
// <Route exact path="/entries/:id" component={Detail} />

// This will display user profile and links to their diary and/or tasting notes
// <Route exact path="/users/:id" component={User} />
// <Route exact path="/profile" component={Profile} />

// Paths for login and signup
// <Route exact path='/login' render={(props) => <Auth {...props} action="login" />} />
// <Route exact path="/signup" render={(props) => <Auth {...props} action="signup" />} />

// Path for search
// <Route exact path='/search' component={ Search } />
