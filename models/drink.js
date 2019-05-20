// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const drinkSchema = new Schema({
  // The first key in our schema is named name, it has a schemaType of string and it is a required value.
  name: { type: String, required: true },
  // Next is category ex. Beer, Coffee, Wine, Tea, Liquor, Sake, other, etc.
  category: { type: String, required: true },
  // This is followed by style if applicable.
  style: { type: String },
  // The next key is named maker, it has a schemaType of string and it is also a required value. This relates to the brewery, distillery, vintner, bartender, etc.
  maker: { type: String, required: true },
  // Next is the origin/region the drink came from if known
  origin: { type: String },
  // Location is where the user had the drink.
  location: { type: String },
  // Next comes notes which is also a string but is not required.
  notes: { type: String },
  // Date the user had the drink. Defaults to the date created.
  date: { type: Date, default: Date.now },
  // username associated with record
  username: { type: String, required: true },
  // Last is date with a schemaType of date and we set the default value to Date.now, as this is not something the user will enter, but will simply keep track of when the record was created.
  dateCreated: { type: Date, default: Date.now }
});

// When you call mongoose.model() on a schema, Mongoose compiles a model for you.
// The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name. Thus, for the example here, the model Drink is for the books collection in the database.

// Note: The .model() function makes a copy of schema. Make sure that you've added everything you want to schema, including hooks, before calling .model()!
const Drink = mongoose.model("Drink", drinkSchema);
// Finally we export the drink model for use by our other files.
module.exports = Drink;
