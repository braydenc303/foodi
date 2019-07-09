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

// A React Component written with a JavaScript class comes with methods like the class constructor – which is primarily used in React to set initial state or to bind methods – and the mandatory render method to return JSX as output. All the internal React Component logic comes from the extends React.Component via object-oriented inheritance that is used in the class component.  https://www.robinwieruch.de/react-component-types/#react-class-components
class Detail extends Component {
  // Here we set our initial state to an empty object that will then be filled in with the information we get back from an axios call to our database for a particular book as soon as this component mounts.
  state = {
    fnb: {}
  };
  // Code to get the book with an _id equal to the id in the route param
  // e.g. http://localhost:3000/books/:id
  componentDidMount() {
    // The book id for this route can be accessed using this.props.match.params.id
    API.getFnb(this.props.match.params.id)
      // We then set the state stored in book to the response data that we get back
      .then(res => this.setState({ fnb: res.data }))
      // If there is an error, we console.log the error.
      .catch(err => console.log(err));
  }
  // The render method returns all of the JSX that will be put on the page. The container, Row, Col, and Jumbotron are all required for our Bootstrap styles. We then create an h1 tag with the book title and author that we have stored in state, followed by an article tag that contains a paragraph with the book synopsis. That is finally followed by a link back to the home page.
  render() {
    return (
      <div className="fnbDetails">
        {this.props.loggedIn ? (
          <Container fluid>
            <Row>
              <Col size="md-12">
                <Jumbotron>
                  <h1>{this.state.fnb.name}</h1>
                </Jumbotron>
              </Col>
            </Row>
            <Row>
              <Col size="md-4">
                <h4>Category</h4>
                <pre>{this.state.fnb.category}</pre>
              </Col>
              <Col size="md-4">
                <h4>Style</h4>
                <pre>{this.state.fnb.style}</pre>
              </Col>
              <Col size="md-4">
                <h4>Maker</h4>
                <pre>{this.state.fnb.maker}</pre>
              </Col>
            </Row>
            <Row>
              <Col size="md-4">
                <h4>Origin</h4>
                <pre>{this.state.fnb.origin}</pre>
              </Col>
              <Col size="md-4">
                <h4>Location</h4>
                <pre>{this.state.fnb.location}</pre>
              </Col>
            </Row>
            <Row>
              <Col size="md-10 md-offset-1">
                <article>
                  <h1>Notes</h1>
                  <pre>{this.state.fnb.notes}</pre>
                </article>
              </Col>
            </Row>
            <Row>
              <Col size="md-2">
                <Link to="/fnbs">← Back to List</Link>
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
export default Detail;
