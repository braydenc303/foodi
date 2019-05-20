// Creates a new router object.
const router = require("express").Router();
// Require in the drinks controller to give us access to all of the functionality of our database calls.
const drinksController = require("../../controllers/drinksController");

// Matches with "/api/drinks"
// "/api" comes from index.js on the mail level of routes. "/drinks" comes from index.js inside of the api folder.
router.route("/")
  // Lets us get all of the drinks from the database
  .get(drinksController.findAll)
  // Lets us post a drink to the database
  .post(drinksController.create);

// Matches with "/api/drinks/:id"
router.route("/:id")
  // Lets us find a drink by a specified ID
  .get(drinksController.findById)
  // Lets us update a drink with a specified ID
  .put(drinksController.update)
  // Lets us delete a drink with a specified ID
  .delete(drinksController.remove);

// exports a router module that can be used in index.js inside the api routes folder thus giving index access to the drink api routes. 
module.exports = router;
