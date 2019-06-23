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

import moment from "moment";
// A React Component written with a JavaScript class comes with methods like the class constructor – which is primarily used in React to set initial state or to bind methods – and the mandatory render method to return JSX as output. All the internal React Component logic comes from the extends React.Component via object-oriented inheritance that is used in the class component.  https://www.robinwieruch.de/react-component-types/#react-class-components
class Entry extends Component {
  // Here we set our initial state to an empty object that will then be filled in with the information we get back from an axios call to our database for a particular book as soon as this component mounts.
  state = {
    entry: {}
  };
  // Code to get the book with an _id equal to the id in the route param
  // e.g. http://localhost:3000/books/:id
  componentDidMount() {
  // The entry id for this route can be accessed using this.props.match.params.id
  API.getEntry(this.props.match.params.id)
  // We then set the state stored in book to the response data that we get back
    .then(res => this.setState({entry: res.data}))
  // If there is an error, we console.log the error.
    .catch(err => console.log(err))
  }
// The render method returns all of the JSX that will be put on the page. The container, Row, Col, and Jumbotron are all required for our Bootstrap styles. We then create an h1 tag with the book title and author that we have stored in state, followed by an article tag that contains a paragraph with the book synopsis. That is finally followed by a link back to the home page.
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {this.state.entry.name}
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-4">
            <h4>Date</h4>
            <pre>{moment(this.state.entry.date).format("MMM DD, YYYY")}</pre>
          </Col>
          <Col size="md-4">
            <h4>Ingredients</h4>
            <pre>{this.state.entry.ingredients}</pre>
          </Col>
          <Col size="md-4">
            <h4>Symptoms</h4>
            <pre>{this.state.entry.symptoms}</pre>
          </Col>
        </Row>
        <Row>
          <Col size="md-4">
            <h4>Time symptoms began</h4>
            <pre>{moment(this.state.entry.time).format("MMM DD, YYYY HH:mm a")}</pre>
          </Col>
          <Col size="md-4">
            <h4>Time symptoms ceased</h4>
            <pre>{moment(this.state.entry.duration).format("MMM DD, YYYY HH:mm a")}</pre>
          </Col>
          <Col size="md-4">
            <h4>Severity</h4>
            <pre>{this.state.entry.severity}</pre>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>Symptom Specifics</h1>
              <pre>{this.state.entry.specificSymptoms}</pre>
            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/entries">← Back to List</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}
// We then must export the Detail page to make it available to be used in App.js
export default Entry;
