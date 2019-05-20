// Creates a new router object.
const router = require("express").Router();
// Require in the users controller to give us access to all of the functionality of our database calls.
const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
// "/api" comes from index.js on the mail level of routes. "/users" comes from index.js inside of the api folder.
router.route("/")
  // Lets us get all of the users from the database
  .get(usersController.findAll)
  // Lets us post a user to the database
  .post(usersController.create);

// Matches with "/api/users/:id"
router.route("/:id")
  // Lets us find a user by a specified ID
  .get(usersController.findById)
  // Lets us update a user with a specified ID
  .put(usersController.update)
  // Lets us delete a user with a specified ID
  .delete(usersController.remove);

// exports a router module that can be used in index.js inside the api routes folder thus giving index access to the user api routes. 
module.exports = router;
