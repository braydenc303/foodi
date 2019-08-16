// gives us access to react functionality and the ability to create a stateful component.
import React, { Component } from "react";
// Provides declarative, accessible navigation around our application. This works in conjuction with Router, Route and Switch used in App.js
import { Link } from "react-router-dom";
// uses object deconstruction to grab the enclosed components from our grid components file as there is more than one export from it.
import { Col, Row, Container } from "../components/Grid";
// imports the Jumbotron component to be used in our render of this page.
import Jumbotron from "../components/Jumbotron";
// Gives us the ability to make axios calls to our api routes.
import API from "../utils/API";

import { Input, TextArea, FormBtn, DatePicker, Time } from "../components/Form";

import moment from "moment";
// A React Component written with a JavaScript class comes with methods like the class constructor – which is primarily used in React to set initial state or to bind methods – and the mandatory render method to return JSX as output. All the internal React Component logic comes from the extends React.Component via object-oriented inheritance that is used in the class component.  https://www.robinwieruch.de/react-component-types/#react-class-components
class Entry extends Component {
  // Here we set our initial state to an empty object that will then be filled in with the information we get back from an axios call to our database for a particular book as soon as this component mounts.
  state = {
    entry: {},
    _id: "",
    name: "", 
    ingredients: "", 
    symptoms: "", 
    time: "", 
    duration: "", 
    severity: "",
    specificSymptoms: "", 
    date: moment(Date.now()).format("YYYY-MM-DD"), 
    userID: this.props.userID
  };

  componentDidMount() {
    this.loadEntry();
  }

  loadEntry() {
    // The entry id for this route can be accessed using this.props.match.params.id
    API.getEntry(this.props.match.params.id)
      // We then set the state to the response data that we get back
      .then(res => this.setState({
        entry: res.data,
        _id: res.data._id,
        date: moment(res.data.date).format("YYYY-MM-DD"),
        name: res.data.name, 
        ingredients: res.data.ingredients, 
        symptoms: res.data.symptoms, 
        time: res.data.time, 
        duration: res.data.duration, 
        location: res.data.location, 
        severity: res.data.severity,
        specificSymptoms: res.data.specificSymptoms, 
      }))
      // If there is an error, we console.log the error.
      .catch(err => console.log(err));
  }

      // Here we write a method to update state anytime an input in one of the form fields changes. Each input change is an event that we must pass into this method.
  handleInputChange = (event) => {
    // console.log(event.target);
    // event.target gives us access to the name and value attributes of the field that changed. We then set those variables and use them to update state in order to reflect the change.
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  };

  // Here we write a method to hand the submission of the form. We pass this method the event.
  handleFormSubmit = (event) => {
    // We must prevent the default behavior of the submit button to avoid reloading the page.
    event.preventDefault();
    // we make an API call to save the fnb to the database.
    API.updateEntry(this.state._id, {
      _id: this.state._id,
      date: this.state.date,
      name: this.state.name, 
      ingredients: this.state.ingredients, 
      symptoms: this.state.symptoms, 
      time: moment(`${moment(this.state.date).format("YYYY-MM-DD")} ${this.state.time}`, "YYYY-MM-DD HH:mm").format(),
      duration: moment(`${moment(this.state.date).format("YYYY-MM-DD")} ${this.state.duration}`, "YYYY-MM-DD HH:mm").format(),
      severity: this.state.severity,
      specificSymptoms: this.state.specificSymptoms, 
      userID: this.state.userID
    })
      // Once we have successfully saved the fnb, we call the loadfnbs method to once again re-render the fnbs to the page so that our list includes the fnb that was just added.
      .then(res => this.loadEntry())
      // If there is an error, we console.log it.
      .catch(err => console.log(err));
    
  };


  // The render method returns all of the JSX that will be put on the page. The container, Row, Col, and Jumbotron are all required for our Bootstrap styles. We then create an h1 tag with the book title and author that we have stored in state, followed by an article tag that contains a paragraph with the book synopsis. That is finally followed by a link back to the home page.
  render() {
    return (
      <div className="entryDetails">
        {this.props.loggedIn ? (
          <Container fluid>
            <Row>
              <Col size="md-12">
                <Jumbotron>
                  <h1>{this.state.name}</h1>
                </Jumbotron>
              </Col>
            </Row>
            <Row>
              <Col size="md-4">
                <h4>Date</h4>
                <pre>
                  {moment(this.state.date).format("MM/DD/YYYY")}
                </pre>
              </Col>
              <Col size="md-4">
                <h4>Ingredients</h4>
                <pre>{this.state.ingredients}</pre>
              </Col>
              <Col size="md-4">
                <h4>Symptoms</h4>
                <pre>{this.state.symptoms}</pre>
              </Col>
            </Row>
            <Row>
              <Col size="md-4">
                <h4>Time symptoms began</h4>
                <pre>
                  {moment(this.state.time).format("HH:mm a")}
                </pre>
              </Col>
              <Col size="md-4">
                <h4>Time symptoms ceased</h4>
                <pre>
                  {moment(this.state.duration).format(
                    "HH:mm a"
                  )}
                </pre>
              </Col>
              <Col size="md-4">
                <h4>Severity</h4>
                <pre>{this.state.entry.severity}</pre>
              </Col>
            </Row>
            <Row>
              <div className="col-md-10 offset-1">
                <article>
                  <h1>Symptom Specifics</h1>
                  <pre>{this.state.specificSymptoms}</pre>
                </article>
              </div>
            </Row>
            <Row>
              <div className="col-md-6 offset-3">
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
                    value={moment(this.state.time).format(
                      "HH:mm"
                    )}
                    onChange={this.handleInputChange}
                    name="time"
                    placeholder="Time symptoms began. (Optional)"
                  />
                  <div>Time symptoms ceased:</div>
                  <Time
                    value={moment(this.state.duration).format(
                      "HH:mm"
                    )}
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
              </div>
            </Row>
            <Row>
              <Col size="md-2">
                <Link to="/users/userentries">← Back to List</Link>
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
// We then must export the Detail page to make it available to be used in App.js
export default Entry;
