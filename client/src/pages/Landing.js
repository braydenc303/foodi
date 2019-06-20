// Todos
// Change Styling on links for more flexibility

// gives us access to react functionality and the ability to create a stateful component.
import React, { Component } from "react";
// The next two lines import the Jumbotron component to be used on the page
import Jumbotron from "../components/Jumbotron";
// Provides declarative, accessible navigation around our application. This works in conjuction with Router, Route and Switch used in App.js
import { Link } from "react-router-dom";
// uses object deconstruction to grab the enclosed components from our Grid, List, and Form components files as there are more than one export from each of them.
import { Col, Row, Container } from "../components/Grid";

class Landing extends Component {
    render () {
        return (
        <Container fluid>
            <Row>
                <Col size="md-6">
                    <Link to="/fnbs"><Jumbotron><h1>Tasting Notes</h1></Jumbotron></Link>
                </Col>
                <Col size="md-6">
                    <Link to="/entries"><Jumbotron><h1>Food Diary</h1></Jumbotron></Link>
                </Col>
            </Row>
        </Container>
    );
  }
};

export default Landing;