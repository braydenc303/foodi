// Creates a new router object.
const router = require("express").Router();
// Require in the foods controller to give us access to all of the functionality of our database calls.
const foodsController = require("../../controllers/foodsController");

// Matches with "/api/foods"
// "/api" comes from index.js on the mail level of routes. "/foods" comes from index.js inside of the api folder.
router.route("/")
  // Lets us get all of the foods from the database
  .get(foodsController.findAll)
  // Lets us post a food to the database
  .post(foodsController.create);

// Matches with "/api/foods/:id"
router.route("/:id")
  // Lets us find a food by a specified ID
  .get(foodsController.findById)
  // Lets us update a food with a specified ID
  .put(foodsController.update)
  // Lets us delete a food with a specified ID
  .delete(foodsController.remove);

// exports a router module that can be used in index.js inside the api routes folder thus giving index access to the food api routes. 
module.exports = router;
