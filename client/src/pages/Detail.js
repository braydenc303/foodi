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

import { Input, TextArea, FormBtn, DatePicker } from "../components/Form";


// A React Component written with a JavaScript class comes with methods like the class constructor – which is primarily used in React to set initial state or to bind methods – and the mandatory render method to return JSX as output. All the internal React Component logic comes from the extends React.Component via object-oriented inheritance that is used in the class component.  https://www.robinwieruch.de/react-component-types/#react-class-components
class Detail extends Component {
  // Here we set our initial state to an empty object that will then be filled in with the information we get back from an axios call to our database for a particular book as soon as this component mounts.
  state = {
    fnb: {},
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
  // Code to get the book with an _id equal to the id in the route param
  // e.g. http://localhost:3000/books/:id
  componentDidMount() {
    this.loadFnb();
  }

  loadFnb() {
       // The book id for this route can be accessed using this.props.match.params.id
       API.getFnb(this.props.match.params.id)
       // We then set the state stored in book to the response data that we get back
       .then(res => this.setState({ 
         _id: res.data._id,
         fnb: res.data,
         name: res.data.name,
         category: res.data.category,
         style: res.data.style,
         maker: res.data.maker,
         origin: res.data.origin,
         location: res.data.location,
         notes: res.data.notes,
         date: res.data.date
        }))
       // If there is an error, we console.log the error.
       .catch(err => console.log(err));
  }

    // Here we write a method to update state anytime an input in one of the form fields changes. Each input change is an event that we must pass into this method.
    handleInputChange = (event, id) => {
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
      // If a title and an author have been provided
      if (this.state.name && this.state.category && this.state.maker) {
        // we make an API call to save the fnb to the database. If no synopsis is provided, it will simply be stored as an empty string.
        API.updateFnb(this.state._id, {
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
          .then(res => this.loadFnb())
          // If there is an error, we console.log it.
          .catch(err => console.log(err));
      }
    };
  // The render method returns all of the JSX that will be put on the page. The container, Row, Col, and Jumbotron are all required for our Bootstrap styles. We then create an h1 tag with the book title and author that we have stored in state, followed by an article tag that contains a paragraph with the book synopsis. That is finally followed by a link back to the home page.
  render() {
    return (
      <div className="fnbDetails">
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
                <h4>Category</h4>
                <pre>{this.state.category}</pre>
              </Col>
              <Col size="md-4">
                <h4>Style</h4>
                <pre>{this.state.style}</pre>
              </Col>
              <Col size="md-4">
                <h4>Maker</h4>
                <pre>{this.state.maker}</pre>
              </Col>
            </Row>
            <Row>
              <Col size="md-4">
                <h4>Origin</h4>
                <pre>{this.state.origin}</pre>
              </Col>
              <Col size="md-4">
                <h4>Location</h4>
                <pre>{this.state.location}</pre>
              </Col>
            </Row>
            <Row>
              <Col size="md-10 md-offset-1">
                <article>
                  <h1>Notes</h1>
                  <pre>{this.state.notes}</pre>
                </article>
              </Col>
            </Row>
            <Row>
              <div className="col-md-4 offset-4">
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
                    Update
                  </FormBtn>
                </form>
              </div>
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
