// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
const mongoose = require("mongoose");
// This gives the seed file access to the models needed to build out our database.
const db = require("../models");

// This file empties the Books collection and inserts the books below

// This tells our app how to connect to the database depending on if we are running on a deployed or a local server.
mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/foodi"
);

// This is an object of data that is structured in the same way as our model book.js.
const entrySeed = [
  {
    // The first key in our schema is the date/time the user ate. Defaults to the date created.
    date: new Date(Date.now()),
    //  Next is the name of the food/drink, it has a schemaType of string and it is a required value.
    name: "Popcorn",
    // Next are the ingredients if known else enter n/a
    ingredients: "Corn, salt, oil",
    // This is followed by symptoms physical/mental if any. Default is none. Perhaps make this a radio button that allows the user to choose more than one.
    symptoms: "Physical",
    // The next key if there were symptoms would be an estimate of the time the symptoms began after eating.
    time: new Date(Date.now()),
    // Next is the duration the symptoms lasted.
    duration: "",
    // The specific symptoms if any
    specificSymptoms: "Abdominal swelling, discomfort",
    // Next comes severity on a scale of 1-10. This can be another radio button.
    severity: 8,
    // username associated with record
    username: "Brayden",
    // Last is date with a schemaType of date and we set the default value to Date.now, as this is not something the user will enter, but will simply keep track of when the record was created.
    dateCreated: new Date(Date.now())
  }
];

// This command empties the books collection and repopulates it by inserting all of the entries in the bookSeed object. If the insertion is successful, it will console log how many records were inserted and then exit the process. If there is an error, it will console log the error and exit the process. process.exit(0) indicates there are no more async processes pending. process.exit(1) indicates that there was an unhandled fatal error.
db.Entry
  .remove({})
  .then(() => db.Entry.collection.insertMany(entrySeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
