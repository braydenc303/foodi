// Gives us the functionality of the express framework
const express = require("express");
// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
const mongoose = require("mongoose");
// 
const logger = require("morgan");
// Gives our server access to everything in the routes folder. By not specifying a routes folder, we get access to everything in the index.js inside routes. It is in this file, that we can then require in everything that server will need access to which will be all of the backend api routes.
const routes = require("./routes");
// Creates our own instance of express
const app = express();
// packages for passport session authentication:
// const session = require("express-session");
// const passport = require("passport");
// const flash = require('connect-flash');
// Creates a dynamic port so that we can use this code both locally and in production.
const PORT = process.env.PORT || 3001;

// express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. This method is called as a middleware in your application using the code: app.use(express.urlencoded()) The extended: true flag allows you to use nested objects.
app.use(express.urlencoded({ extended: true }));

// This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
// Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option. This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings.
app.use(express.json());
// The following are all lines needed for the auth middleware

// Define middleware here
// app.use(flash());
// app.use(express.static("public"));
// app.use(session({
//   secret: "keyboard cat",
//   resave: false,
//   saveUninitialize: true,
//   // cookie: {secure: true}
// }));
// app.use(passport.initialize());
// app.use(passport.session());


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Use morgan logger for logging requests
app.use(logger("dev"));

// Add routes, both API and view
app.use(routes);

//If deployed, use the deployed database.  Otherwise use the local mongo database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/foodi"


// Connect to the Mongo DB
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true })
  .then(()=> console.log('MongoDB Connected'))

  // Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
