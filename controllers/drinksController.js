// This constant called db will be called whenever we want to manipulate the data in our database. In order to do so, we have to give it access to our models.
const db = require("../models");

// Defining methods for the drinksController to be used in the books.js api routes.
module.exports = {
  // Finds all of the records
  findAll: function(req, res) {
    // in the drinks collection
    db.Drink
      .find(req.query)
      // sorts them in descending order of their creation date
      .sort({ date: -1 })
      // then responds with a json object of data built from our model if successful
      .then(dbModel => res.json(dbModel))
      // or catches the error and responds with a 422 if there is a problem.
      .catch(err => res.status(422).json(err));
  },
  // Finds a record with a matching ID
  findById: function(req, res) {
    // in the drinks collection
    db.Drink
    // we get our id, from the request parameters which is usually grabbed from a data attribute on click/submit
      .findById(req.params.id)
      // then responds with a json object of data built from our model if successful
      .then(dbModel => res.json(dbModel))
      // or catches the error and responds with a 422 if there is a problem.
      .catch(err => res.status(422).json(err));
  },
  // Creates a record
  create: function(req, res) {
    // in the Drinks collections
    db.Drink
    // built from the data submitted to the body of the request
      .create(req.body)
      // then responds with a json object of data built from our model if successful
      .then(dbModel => res.json(dbModel))
      // or catches the error and responds with a 422 if there is a problem.
      .catch(err => res.status(422).json(err));
  },
  // Udates a record
  update: function(req, res) {
    // in the drinks collection
    db.Drink
    // that has a matching id to what is coming from the parameters of our request which is usually grabbed from a data attribute on click/submit, with the data submitted to the body of the request.
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      // then responds with a json object of dat built from our model if successful
      .then(dbModel => res.json(dbModel))
      // or catches the error and responds with a 422 if there is a problem.
      .catch(err => res.status(422).json(err));
  },
  // Removes a record
  remove: function(req, res) {
    // from the drinks collection
    db.Drink
    // Here we find the record that has an ID that matches what is coming from the parameters of our request, which is usually grabbed from a data attribute on click/submit
      .findById({ _id: req.params.id })
      // then we remove it from the collection
      .then(dbModel => dbModel.remove())
      // then responds with a json object of the record that was removed if successful
      .then(dbModel => res.json(dbModel))
      // or catches the error and responds with a 422 if there is a problem.
      .catch(err => res.status(422).json(err));
  }
};
