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
// import API to allow a check to see if a user is logged in.
import API from "../utils/API";

const Landing = props => {
  console.log(props);

  return (
    <div className="landingPage">
      {props.loggedIn ? (
        <Container fluid>
          <Row>
            <Col size="md-9">
              <h1>
                Welcome {props.username}! What would you like to work on today?
              </h1>
            </Col>
          </Row>
          <Row>
            <Col size="md-6">
              <Link to="/users/userFnbs">
                <Jumbotron>
                  <h2>Tasting Notes</h2>
                </Jumbotron>
              </Link>
            </Col>
            <Col size="md-6">
              <Link to="/users/userEntries">
                <Jumbotron>
                  <h2>Food Diary</h2>
                </Jumbotron>
              </Link>
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
};

export default Landing;
