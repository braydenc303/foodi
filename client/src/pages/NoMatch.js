// gives us access to react functionality
import React from "react";
// uses object deconstruction to grab the enclosed components from our grid components file as there is more than one export from it.
import { Col, Row, Container } from "../components/Grid";
// gives us access to the jumbotron component that we have built.
import Jumbotron from "../components/Jumbotron";

// creates a page that will display when the user reaches a route that does not match / or /books.
// This will be a "dumb component" that does not require state, so we can simply write this as funtion as opposed to writing it as a class based component.
//It will return a container that holds a row, that holds a column, that holds a Jumbotron which allows us to utilize bootstrap styling.
function NoMatch() {
  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>404 Page Not Found</h1>
            <h1>
              <span role="img" aria-label="Face With Rolling Eyes Emoji">
                🙄
              </span>
            </h1>
            <a href="/landing">Return to home</a>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}
// Here we export the page to be used in App.js
export default NoMatch;
