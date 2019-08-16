// Todos
// Get rid of console.logs
// Make sure to get rid of hard coded username when login has been implemented.
// Change symptoms to dropdown with physical, mental, or both as options.
// Change severity to a slider

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
import { Input, TextArea, FormBtn, DatePicker, Time } from "../components/Form";

import moment from "moment";

// A React Component written with a JavaScript class comes with methods like the class constructor – which is primarily used in React to set initial state or to bind methods – and the mandatory render method to return JSX as output. All the internal React Component logic comes from the extends React.Component via object-oriented inheritance that is used in the class component.  https://www.robinwieruch.de/react-component-types/#react-class-components
class Entries extends Component {
  // Here we set the initial state of entries to an empty array which will be filled in with the data that we get back from our axios call to the database when the component mounts. The states of title, author, and synopsis will be updated upon user input in the form.
  state = {
    loggedIn: false,
    user: {},
    entries: [],
    date: moment(Date.now()).format("YYYY-MM-DD"),
    name: "",
    ingredients: "",
    symptoms: "",
    time: "",
    duration: "",
    severity: "",
    specificSymptoms: "",
    userID: this.props.userID
  };
  // This calls the following loadEntries function as soon as this component mounts.
  componentDidMount() {

    this.loadEntries();

  }

  loading() {
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 1000);
  }
  // Code to get all of the entries information from the database so that we can then display them as a list.
  loadEntries = () => {
    // Here we use our API to make an axios call to the database to get all entries.
    API.getUserEntries(this.props.userID)
    // When we get the response back we set the state of the entries array by filling it in with objects for each entry with the structure: {title:"", author: "", synopsis: ""}
      .then(res => {
        // console.log(res.data);
        return this.setState({ 
          entries: res.data.entryArray, 
        })
      }
      )
      // If there is an error, we console.log it.
      .catch(err => console.log(err));
  };
  // Here we create a method which will delete a entry with a given id.
  deleteEntry = id => {
    // We make an API call to delete entry passing in the id associated with the button
    API.deleteEntry(id)
      // When we get a successful response back, we call our loadentries method to reload the entries in the database to the page again in order to reflect the current collection of entries.
      .then(res => this.loadEntries())
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
    if (this.state.name && this.state.ingredients) {
      // let time = `${moment(this.state.date).format("YYYY-MM-DD")} ${moment(this.state.time).format("HH:mm")}`
      // we make an API call to save the entry to the database. If no synopsis is provided, it will simply be stored as an empty string.
      API.saveEntry({
        date: this.state.date,
        name: this.state.name,
        ingredients: this.state.ingredients,
        symptoms: this.state.symptoms,
        time: moment(`${moment(this.state.date).format("YYYY-MM-DD")} ${this.state.time}`, "YYYY-MM-DD HH:mm").format(),
        duration: moment(`${moment(this.state.date).format("YYYY-MM-DD")} ${this.state.duration}`, "YYYY-MM-DD HH:mm").format(),
        severity: parseInt(this.state.severity),
        specificSymptoms: this.state.specificSymptoms,
        userID: this.props.userID
      })
        // Once we have successfully saved the entry, we call the loadentries method to once again re-render the entries to the page so that our list includes the entry that was just added.
        .then(res => this.loadEntries())
        // If there is an error, we console.log it.
        .catch(err => console.log(err));
    }
  };

  // The render method returns all of the JSX that will be put on the page. The container, Row, Col, and Jumbotron are all required for our Bootstrap styles. This component Uses our bootstrap Container, Row, and Col components to format the page into one column on small screens and two columns on anything larger through the use of bootstrap classes. The What  Should I Have section will contain the form that allows a user to suggest a food or beverage, while the On My List section simply displays a scrollable list of food and drinks in the database along with a button that allows the user to delete a food or drink. If there are no foods or drinks in the database, we display "No Results to Display."
  render() {
    console.log(this.state);
    console.log(this.props);
    return (
      <div className="userEntries">
        {this.props.loggedIn ? (
          <Container fluid>
            <Row>
              <Col size="md-6">
                <Jumbotron>
                  <h1>New Diary Entry</h1>
                </Jumbotron>
                <form>
                  <DatePicker
                    value={this.state.date}
                    onChange={this.handleInputChange}
                    name="date"
                    placeholder="Required"
                  />
                  <Input
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    name="name"
                    placeholder="Name (Required)"
                  />
                  <Input
                    value={this.state.ingredients}
                    onChange={this.handleInputChange}
                    name="ingredients"
                    placeholder="Ingredients (Required)"
                  />
                  <Input
                    value={this.state.symptoms}
                    onChange={this.handleInputChange}
                    name="symptoms"
                    placeholder="Symptoms (Optional)"
                  />
                  <div>Time symptoms began:</div>
                  <Time
                    label="Time Symptoms Began"
                    value={this.state.time}
                    onChange={this.handleInputChange}
                    name="time"
                    placeholder="Time symptoms began. (Optional)"
                  />
                  <div>Time symptoms ceased:</div>
                  <Time
                    value={this.state.duration}
                    onChange={this.handleInputChange}
                    name="duration"
                    placeholder="Time Symptoms Ceased (Optional)"
                  />
                  <Input
                    value={this.state.severity}
                    onChange={this.handleInputChange}
                    name="severity"
                    placeholder="Severity (optional)"
                  />
                  <TextArea
                    value={this.state.specificSymptoms}
                    onChange={this.handleInputChange}
                    name="specificSymptoms"
                    placeholder="Symptom specifics (Optional)"
                  />
                  <FormBtn
                    disabled={
                      !(
                        this.state.name &&
                        this.state.ingredients
                      )
                    }
                    onClick={this.handleFormSubmit}
                  >
                    Submit Entry
                  </FormBtn>
                </form>
              </Col>
              <Col size="md-6 sm-12">
                <Jumbotron>
                  <h1>Entries</h1>
                </Jumbotron>
                {this.state.user && this.state.entries.length ? (
                  <List>
                    {this.state.entries.map(entry => (
                      <ListItem key={entry._id}>
                        <Link to={"/users/userEntries/" + entry._id}>
                          <strong>{entry.name}</strong>
                        </Link>
                        <DeleteBtn
                          onClick={() => this.deleteEntry(entry._id)}
                        />
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
// We then export the entry to make it available for use in App.js
export default Entries;
