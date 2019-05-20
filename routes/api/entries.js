// Creates a new router object.
const router = require("express").Router();
// Require in the entries controller to give us access to all of the functionality of our database calls.
const entriesController = require("../../controllers/entriesController");

// Matches with "/api/entries"
// "/api" comes from index.js on the mail level of routes. "/entries" comes from index.js inside of the api folder.
router.route("/")
  // Lets us get all of the entries from the database
  .get(entriesController.findAll)
  // Lets us post a entry to the database
  .post(entriesController.create);

// Matches with "/api/entries/:id"
router.route("/:id")
  // Lets us find a entry by a specified ID
  .get(entriesController.findById)
  // Lets us update a entry with a specified ID
  .put(entriesController.update)
  // Lets us delete a entry with a specified ID
  .delete(entriesController.remove);

// exports a router module that can be used in index.js inside the api routes folder thus giving index access to the entry api routes. 
module.exports = router;
