// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const entrySchema = new Schema({
  // The first key in our schema is the date/time the user ate. Defaults to the date created.
  date: { type: Date, default: Date.now },
  //  Next is the name of the food/drink, it has a schemaType of string and it is a required value.
  name: { type: String, required: true },
  // Next are the ingredients if known else enter n/a
  ingredients: { type: String, required: true },
  // This is followed by symptoms physica/mental if any. Default is none. Perhaps make this a radio button that allows the user to choose more than one.
  symptoms: { type: String, required: true, default: "none" },
  // The next key if there were symptoms would be an estimate of the time the symptoms began after eating.
  time: { type: Date, required: false },
  // Next is the duration the symptoms lasted.
  duration: { type: Date, required: false },
  // The specific symptoms if any
  specificSymptoms: { type: String, required: false },
  // Next comes severity on a scale of 1-10. This can be another radio button.
  severity: { type: Number },
  // username associated with record
  username: { type: String, required: true },
  // Last is date with a schemaType of date and we set the default value to Date.now, as this is not something the user will enter, but will simply keep track of when the record was created.
  dateCreated: { type: Date, default: Date.now }
});

// When you call mongoose.model() on a schema, Mongoose compiles a model for you.
// The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name. Thus, for the example here, the model Drink is for the books collection in the database.

// Note: The .model() function makes a copy of schema. Make sure that you've added everything you want to schema, including hooks, before calling .model()!
const Entry = mongoose.model("Entry", entrySchema);
// Finally we export the drink model for use by our other files.
module.exports = Entry;
