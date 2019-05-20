// Creates a new router object.
const router = require("express").Router();
// Require in the beers controller to give us access to all of the functionality of our database calls.
const beersController = require("../../controllers/beersController");

// Matches with "/api/beers"
// "/api" comes from index.js on the mail level of routes. "/beers" comes from index.js inside of the api folder.
router.route("/")
  // Lets us get all of the beers from the database
  .get(beersController.findAll)
  // Lets us post a beer to the database
  .post(beersController.create);

// Matches with "/api/beers/:id"
router.route("/:id")
  // Lets us find a beer by a specified ID
  .get(beersController.findById)
  // Lets us update a beer with a specified ID
  .put(beersController.update)
  // Lets us delete a beer with a specified ID
  .delete(beersController.remove);

// exports a router module that can be used in index.js inside the api routes folder thus giving index access to the beer api routes. 
module.exports = router;
