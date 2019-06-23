// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
const mongoose = require("mongoose");
// This gives the seed file access to the models needed to build out our database.
const db = require("../models");

const moment = require("moment");

// This file empties the Books collection and inserts the books below

// This tells our app how to connect to the database depending on if we are running on a deployed or a local server.
mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/foodi"
);

// This is an object of data that is structured in the same way as our model book.js.
const fnbSeed = [
  {
  // The first key in our schema is the name of the food or drink, it has a schemaType of string and it is a required value.
  name: "The Balvenie 12yr Doublewood",
  // Next is category ex. cheese, chocolate, fruit, vegetable, dish, pastry, ice-cream, Beer, Coffee, Wine, Tea, Liquor, Sake, etc.
  category: "Scotch",
  // This is followed by style if applicable. Ex. if the category was cheese, a style would be blue or soft ripened.
  style: "Blended",
  // The next key is named maker, it has a schemaType of string and it is also a required value. This relates to the brewery, distillery, vintner, bartender, etc.
  maker: "The Balvenie",
  // Next is the origin/region the food came from if known
  origin: "Scotland",
  // Location is where the user had the food or drink.
  location: "Beatrice and Woodsley",
  // Next comes notes which is also a string but is not required.
  notes: "One of my favorite, easy to drink Scotch Whiskeys.",
  // Date the user had the food. Defaults to the date created.
  date: moment().format("MMM DD, YYYY"),
  // username associated with record
  username: "Brayden",
  // Last is date with a schemaType of date and we set the default value to Date.now, as this is not something the user will enter, but will simply keep track of when the record was created.
  dateCreated: new Date(Date.now())
  },
  {
    // The first key in our schema is the name of the food or drink, it has a schemaType of string and it is a required value.
    name: "L'edel de Cleron",
    // Next is category ex. cheese, chocolate, fruit, vegetable, dish, pastry, ice-cream, Beer, Coffee, Wine, Tea, Liquor, Sake, etc.
    category: "Cheese",
    // This is followed by style if applicable. Ex. if the category was cheese, a style would be blue or soft ripened.
    style: "Vacherin",
    // The next key is named maker, it has a schemaType of string and it is also a required value. This relates to the brewery, distillery, vintner, bartender, etc.
    maker: "Fromagerie Jean Perrin",
    // Next is the origin/region the food came from if known
    origin: "France",
    // Location is where the user had the food or drink.
    location: "Whole Foods Market",
    // Next comes notes which is also a string but is not required.
    notes: "Tastes... unpleasant. :(",
    // Date the user had the food. Defaults to the date created.
    date: moment().format("MMM DD, YYYY"),
    // username associated with record
    username: "Brayden",
    // Last is date with a schemaType of date and we set the default value to Date.now, as this is not something the user will enter, but will simply keep track of when the record was created.
    dateCreated: new Date(Date.now())
    }
];

// This command empties the books collection and repopulates it by inserting all of the entries in the bookSeed object. If the insertion is successful, it will console log how many records were inserted and then exit the process. If there is an error, it will console log the error and exit the process. process.exit(0) indicates there are no more async processes pending. process.exit(1) indicates that there was an unhandled fatal error.
db.Fnb
  .remove({})
  .then(() => db.Fnb.collection.insertMany(fnbSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
