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
import { Input, TextArea, FormBtn } from "../components/Form";

// A React Component written with a JavaScript class comes with methods like the class constructor – which is primarily used in React to set initial state or to bind methods – and the mandatory render method to return JSX as output. All the internal React Component logic comes from the extends React.Component via object-oriented inheritance that is used in the class component.  https://www.robinwieruch.de/react-component-types/#react-class-components
class Books extends Component {
  // Here we set the initial state of books to an empty array which will be filled in with the data that we get back from our axios call to the database when the component mounts. The states of title, author, and synopsis will be updated upon user input in the form.
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: ""
  };
  // This calls the following loadbooks function as soon as this component mounts.
  componentDidMount() {
    this.loadBooks();
  }
  // Code to get all of the books information from the database so that we can then display them as a list.
  loadBooks = () => {
    // Here we use our API to make an axios call to the database to get all books.
    API.getBooks()
    // When we get the response back we set the state of the books array by filling it in with objects for each book with the structure: {title:"", author: "", synopsis: ""}
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      // If there is an error, we console.log it.
      .catch(err => console.log(err));
  };
  // Here we create a method which will delete a book with a given id.
  deleteBook = id => {
    // We make an API call to delete book passing in the id associated with the button
    API.deleteBook(id)
    // When we get a successful response back, we call our loadBooks method to reload the books in the database to the page again in order to reflect the current collection of books.
      .then(res => this.loadBooks())
      // If there is an error, we console.log it. This of course could be handled better.
      .catch(err => console.log(err));
  };
  // Here we write a method to update state anytime an input in one of the form fields changes. Each input change is an event that we must pass into this method.
  handleInputChange = event => {
    console.log(event.target);
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
    if (this.state.title && this.state.author) {
      // we make an API call to save the book to the database. If no synopsis is provided, it will simply be stored as an empty string.
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
      // Once we have successfully saved the book, we call the loadBooks method to once again re-render the books to the page so that our list includes the book that was just added.
        .then(res => this.loadBooks())
        // If there is an error, we console.log it.
        .catch(err => console.log(err));
    }
  };

// The render method returns all of the JSX that will be put on the page. The container, Row, Col, and Jumbotron are all required for our Bootstrap styles. This component Uses our bootstrap Container, Row, and Col components to format the page into one column on small screens and two columns on anything larger through the use of bootstrap classes. The What Books Should I Read section will contain the form that allows a user to suggest a book, while the Books On My List section simply displays a scrollable list of books in the database along with a button that allows the user to delete a book. If there are no books in the database, we display "No Results to Display."
render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              />
              <FormBtn
                disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
// We then export the book to make it available for use in App.js
export default Books;
