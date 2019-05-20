// The Path module provides a way of working with directories and file paths.
const path = require("path");
// Creates a new router object.
const router = require("express").Router();
// Gives the index file access to all of the api routes.
const apiRoutes = require("./api");

// Tell router what routes to use.
// API Routes
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  //This line will respond by sending the index file. Path lets us join the path to current file with the relative path to the file that we want to send to the front.
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// This line exports the router that we have built and makes it availble to be required into server.js
module.exports = router;
