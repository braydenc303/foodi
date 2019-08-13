// Todos
// Get rid of console.logs
// Make sure to get rid of hard coded username when login has been implemented.

// gives us access to react functionality and the ability to create a stateful component.
import React, { Component } from "react";
// The next two lines import the delete button and Jumbotron components to be used on the page
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
// Gives us the ability to make axios calls to our api routes.
import API from "../utils/API";
// Provides declarative, accessible navigation around our application. This works in conjuction with Router, Route and Switch used in App.js
import { Link } from "react-router-dom";
// uses object deconstruction to grab the enclosed components from our Grid, List, and Form components files as there are more than one export from each of them.
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn, DatePicker } from "../components/Form";

// A React Component written with a JavaScript class comes with methods like the class constructor – which is primarily used in React to set initial state or to bind methods – and the mandatory render method to return JSX as output. All the internal React Component logic comes from the extends React.Component via object-oriented inheritance that is used in the class component.  https://www.robinwieruch.de/react-component-types/#react-class-components
class Fnbs extends Component {
  // Here we set the initial state of fnbs to an empty array which will be filled in with the data that we get back from our axios call to the database when the component mounts. The states of title, author, and synopsis will be updated upon user input in the form.
  state = {
    fnbs: [],
    name: "",
    category: "",
    style: "",
    maker: "",
    origin: "",
    location: "",
    notes: "",
    date: Date.now(),
    userID: this.props.userID
  };
  // This calls the following loadfnbs function as soon as this component mounts.
  componentDidMount() {
    console.log("hello");
    // this.loading();

    API.isLoggedIn()
      .then(user => {
        if (user.data.loggedIn) {
          this.setState(
            {
              loggedIn: true,
              user: user.data.user
            },
            () => {
              this.loadFnbs();
            }
          );
        }
        console.log(this.state.user);
      })
      .catch(err => {
        console.log(err);
      });

    // console.log(this.props)
  }

  loading() {
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 1000);
  }
  // Code to get all of the fnbs information from the database so that we can then display them as a list.
  loadFnbs = () => {
    console.log("Loading data");
    // Here we use our API to make an axios call to the database to get all fnbs.
    API.getUserFnbs(this.props.userID)
      // When we get the response back we set the state of the fnbs array by filling it in with objects for each fnb with the structure: {title:"", author: "", synopsis: ""}
      .then(res => {
        console.log(res.data.fnbArray);
        return this.setState({
          fnbs: res.data.fnbArray,
          name: "",
          category: "",
          style: "",
          maker: "",
          origin: "",
          location: "",
          notes: "",
          date: Date.now(),
          userID: this.props.userID
        });
      })
      // If there is an error, we console.log it.
      .catch(err => console.log(err));
  };
  // Here we create a method which will delete a fnb with a given id.
  deleteFnb = id => {
    // We make an API call to delete fnb passing in the id associated with the button
    API.deleteFnb(id)
      // When we get a successful response back, we call our loadfnbs method to reload the fnbs in the database to the page again in order to reflect the current collection of fnbs.
      .then(res => this.loadFnbs())
      // If there is an error, we console.log it. This of course could be handled better.
      .catch(err => console.log(err));
  };
  // Here we write a method to update state anytime an input in one of the form fields changes. Each input change is an event that we must pass into this method.
  handleInputChange = event => {
    // console.log(event.target);
    // event.target gives us access to the name and value attributes of the field that changed. We then set those variables and use them to update state in order to reflect the change.
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  // Here we write a method to hand the submission of the form. We pass this method the event.
  handleFormSubmit = event => {
    // We must prevent the default behavior of the submit button to avoid reloading the page.
    event.preventDefault();
    // If a title and an author have been provided
    if (this.state.name && this.state.category && this.state.maker) {
      // we make an API call to save the fnb to the database. If no synopsis is provided, it will simply be stored as an empty string.
      API.saveFnb({
        name: this.state.name,
        category: this.state.category,
        style: this.state.style,
        maker: this.state.maker,
        origin: this.state.origin,
        location: this.state.location,
        notes: this.state.notes,
        date: this.state.date,
        userID: this.props.userID
      })
        // Once we have successfully saved the fnb, we call the loadfnbs method to once again re-render the fnbs to the page so that our list includes the fnb that was just added.
        .then(res => this.loadFnbs())
        // If there is an error, we console.log it.
        .catch(err => console.log(err));
    }
  };

  // The render method returns all of the JSX that will be put on the page. The container, Row, Col, and Jumbotron are all required for our Bootstrap styles. This component Uses our bootstrap Container, Row, and Col components to format the page into one column on small screens and two columns on anything larger through the use of bootstrap classes. The What  Should I Have section will contain the form that allows a user to suggest a food or beverage, while the On My List section simply displays a scrollable list of food and drinks in the database along with a button that allows the user to delete a food or drink. If there are no foods or drinks in the database, we display "No Results to Display."
  render() {
    console.log(this.props);
    console.log(this.state);
    return (
      <div className="userFnbs">
        {this.props.loggedIn ? (
          <Container fluid>
            <Row>
              <Col size="md-6">
                <Jumbotron>
                  <h1>Enter Tasting Notes</h1>
                </Jumbotron>
                <form>
                  <Input
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    name="name"
                    placeholder="Name (Required)"
                  />
                  <Input
                    value={this.state.category}
                    onChange={this.handleInputChange}
                    name="category"
                    placeholder="Category (Required)"
                  />
                  <Input
                    value={this.state.style}
                    onChange={this.handleInputChange}
                    name="style"
                    placeholder="Style (Optional)"
                  />
                  <Input
                    value={this.state.maker}
                    onChange={this.handleInputChange}
                    name="maker"
                    placeholder="Maker (Required)"
                  />
                  <Input
                    value={this.state.origin}
                    onChange={this.handleInputChange}
                    name="origin"
                    placeholder="Origin (Optional)"
                  />
                  <Input
                    value={this.state.location}
                    onChange={this.handleInputChange}
                    name="location"
                    placeholder="Location (optional)"
                  />
                  <TextArea
                    value={this.state.notes}
                    onChange={this.handleInputChange}
                    name="notes"
                    placeholder="Notes (Optional)"
                  />
                  <DatePicker
                    value={this.state.date}
                    onChange={this.handleInputChange}
                    name="date"
                    placeholder="Required"
                  />
                  <FormBtn
                    disabled={
                      !(
                        this.state.name &&
                        this.state.category &&
                        this.state.maker
                      )
                    }
                    onClick={this.handleFormSubmit}
                  >
                    Submit Food or Drink
                  </FormBtn>
                </form>
              </Col>
              <Col size="md-6 sm-12">
                <Jumbotron>
                  <h1>My List</h1>
                </Jumbotron>
                {this.state.user && this.state.fnbs.length ? (
                  <List>
                    {this.state.fnbs.map(fnb => (
                      <ListItem key={fnb._id}>
                        <Link to={"/users/userFnbs/" + fnb._id}>
                          <strong>
                            {fnb.name} ({fnb.category})
                          </strong>
                        </Link>
                        <DeleteBtn onClick={() => this.deleteFnb(fnb._id)} />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <h3>No Results to Display</h3>
                )}
              </Col>
            </Row>
          </Container>
        ) : (
          <div className="noUser">
            <>
              <h1>PLEASE LOG IN</h1>
              <Link className="loginLink" to="/login">
                <button className="loginBtn" color="info">
                  Login
                </button>
              </Link>
            </>
          </div>
        )}
      </div>
    );
  }
}
// We then export the fnb to make it available for use in App.js
export default Fnbs;
