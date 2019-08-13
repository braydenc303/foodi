// gives us access to react functionality
import React, {Component} from "react";
// DOM bindings for React Router.
// BrowserRouter is a router implementation that uses the HTML5 history API
// Route updates the UI when a link is clicked.
// The <Switch> is not required for grouping <Route>s, but it can be quite useful. A <Switch> will iterate over all of its children <Route> elements and only render the first one that matches the current location. This helps when multiple route’s paths match the same pathname, when animating transitions between routes, and in identifying when no routes match the current location (so that you can render a “404” component).
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import in the books page
import API from "./utils/API";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile"
import Landing from "./pages/Landing";
//import in the fnbs page
import Fnbs from "./pages/Fnbs"
//import in the entries page
import Entries from "./pages/Entries";
//import in the individual entry page
import Entry from "./pages/Entry";
// import in the detail page
import Detail from "./pages/Detail";
// import in the NoMatch page
import NoMatch from "./pages/NoMatch";
// import in the Nav component to be displayed with every page
import Nav from "./components/Nav";
// create a function called app that will display the proper components when a particular route is hit.
class App extends Component {

  state = {
    loggedIn: false,
    username: "",
    password: "",
    confirmPassword: "",
    user: null,
    message: "",
    userID: ""
}

componentDidMount(){
    API.isLoggedIn().then(user => {
        if(user.data.loggedIn){
            this.setState({
                loggedIn: true,
                user: user.data,
                username: user.data.user.username,
                userID: user.data.user._id
            })
        }
    })
};



handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
        [name]: value
    });
};

handleLogin = event => {
    event.preventDefault();
    if(this.state.username && this.state.password) {
        API.login({
            username: this.state.username,
            password: this.state.password
        }).then(user => {
            // console.log(user);
            if(user.data.loggedIn) {
                this.setState({
                    loggedIn: true,
                    user: user.data.user
                });
                console.log(this.state.username);
                console.log("login successful");
                console.log(this.state.user);
                this.setState({
                    password: ""
                })
                window.location.href = '/landing';
            }
            else if (user.data.message) {
                this.setState({
                    message: user.data.message
                })
            }
        });
    }
};

handleLogout = event => {
    event.preventDefault();
    console.log("logout hit");
        API.logout()
        .then(user => {
            // console.log(user);
            if(!user.data.loggedIn) {
                console.log("logout successful");
                this.setState({
                    loggedIn: false,
                    username: "",
                    password: "",
                    confirmPassword: "",
                    user: null,
                    message: "" 
                })
                console.log("This should take us to /");
                window.location.pathname = '/';
            }
            else if (user.data.message) {
                this.setState({
                    message: user.data.message
                })
            }
        });
    
};

handleSignup = event => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
        API.signup({
            username: this.state.username,
            password: this.state.password
        }).then(user => {
            if(user.data.loggedIn) {
                this.setState({
                    loggedIn: true,
                    user: user.data.user,
                    username: user.data.user.user.username
                });
                console.log("login successful");
                this.setState({
                    password: ""
                });
                window.location.href = '/landing';
            } else {
                console.log("Something went wrong:(");
                console.log(user.data);
                this.setState({
                    message: user.data,
                    password: "",
                    confirmPassword: ""
                });
                
            }
        });
    }
}
  // Because a function can only return one thing, we return the router with the proper components inside.
  
  render(){
    return(

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
            <Route exact path="/" render={(props) => 
              <Auth {...props} 
                loggedIn={this.state.loggedIn} 
                username={this.state.username} 
                password={this.state.password} 
                confirmPassword={this.state.confirmPassword} 
                user={this.state.user} 
                message={this.state.message} 
                handleInputChange={this.handleInputChange} 
                handleLogin={this.handleLogin} 
                handleLogout={this.handleLogout} 
                handleSignup={this.handleSignup} 
                action="login" />} />

            <Route exact path="/landing" render={(props) => 
              <Landing {...props} 
                loggedIn={this.state.loggedIn} 
                username={this.state.username} 
                user={this.state.user} />} />

            <Route exact path='/login' render={(props) => 
              <Auth {...props} 
                loggedIn={this.state.loggedIn} 
                username={this.state.username} 
                password={this.state.password} 
                user={this.state.user} 
                handleInputChange={this.handleInputChange} 
                handleLogin={this.handleLogin} 
                handleLogout={this.handleLogout} 
                action="login" />} />

            <Route exact path="/signup" render={(props) => 
              <Auth {...props} 
                loggedIn={this.state.loggedIn} 
                username={this.state.username} 
                message={this.state.message} 
                password={this.state.password} 
                user={this.state.user} 
                handleInputChange={this.handleInputChange} 
                handleLogin={this.handleLogin} 
                handleLogout={this.handleLogout} 
                action="signup" />} />

            <Route exact path="/users/userFnbs" render={(props) => 
              <Fnbs {...props} 
              username={this.state.username} 
              loggedIn={this.state.loggedIn}
              user={this.state.user}
              userID={this.state.userID}
              />} />

            <Route exact path="/users/userFnbs/:id" render={(props) =>
              <Detail {...props}
              username={this.state.username}
              loggedIn={this.state.loggedIn}
              />} />

            <Route exact path="/users/userEntries" render={(props) => 
              <Entries {...props}
              username={this.state.username} 
              loggedIn={this.state.loggedIn}
              user={this.state.user}
              userID={this.state.userID}  
              />} />

            <Route exact path="/users/userEntries/:id" render={(props) => 
              <Entry {...props} 
              username={this.state.username}
              loggedIn={this.state.loggedIn}
              />} />
            
            <Route exact path="/profile" component={Profile} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  }
  
}
// export app to be used in index.js
export default App;

// The following lines will be added to the switch once the components are complete

// This will display user profile and links to their diary and/or tasting notes
// <Route exact path="/users/:id" component={User} />
// <Route exact path="/profile" component={Profile} />

// Paths for login and signup
// <Route exact path='/login' render={(props) => <Auth {...props} action="login" />} />
// <Route exact path="/signup" render={(props) => <Auth {...props} action="signup" />} />

// Path for search
// <Route exact path='/search' component={ Search } />
