// Creates a new router object.
const router = require("express").Router();
// Require in the dishes controller to give us access to all of the functionality of our database calls.
const dishesController = require("../../controllers/dishesController");

// Matches with "/api/dishes"
// "/api" comes from index.js on the mail level of routes. "/dishes" comes from index.js inside of the api folder.
router.route("/")
  // Lets us get all of the dishes from the database
  .get(dishesController.findAll)
  // Lets us post a dish to the database
  .post(dishesController.create);

// Matches with "/api/dishes/:id"
router.route("/:id")
  // Lets us find a dish by a specified ID
  .get(dishesController.findById)
  // Lets us update a dish with a specified ID
  .put(dishesController.update)
  // Lets us delete a dish with a specified ID
  .delete(dishesController.remove);

// exports a router module that can be used in index.js inside the api routes folder thus giving index access to the dish api routes. 
module.exports = router;
