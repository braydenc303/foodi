// Creates a new router object.
const router = require("express").Router();
// Require in the fnbs controller to give us access to all of the functionality of our database calls.
const fnbsController = require("../../controllers/fnbsController");

// Matches with "/api/fnbs"
// "/api" comes from index.js on the mail level of routes. "/fnbs" comes from index.js inside of the api folder.
router.route("/")
  // Lets us get all of the fnbs from the database
  .get(fnbsController.findAll)
  // Lets us post a fnb to the database
  .post(fnbsController.create);

// Matches with "/api/fnbs/:id"
router.route("/:id")
  // Lets us find a fnb by a specified ID
  .get(fnbsController.findById)
  // Lets us update a fnb with a specified ID
  .put(fnbsController.update)
  // Lets us delete a fnb with a specified ID
  .delete(fnbsController.remove);

// exports a router module that can be used in index.js inside the api routes folder thus giving index access to the fnb api routes. 
module.exports = router;
