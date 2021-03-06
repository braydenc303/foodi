// Because the food and drink models are basically identical, I think I can get away with using just one model for both, fnb (food and beverage)


// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const fnbSchema = new Schema({
  // The first key in our schema is the name of the food or drink, it has a schemaType of string and it is a required value.
  name: { type: String, required: true },
  // Next is category ex. cheese, chocolate, fruit, vegetable, dish, pastry, ice-cream, Beer, Coffee, Wine, Tea, Liquor, Sake, etc.
  category: { type: String, required: true },
  // This is followed by style if applicable. Ex. if the category was cheese, a style would be blue or soft ripened.
  style: { type: String },
  // The next key is named maker, it has a schemaType of string and it is also a required value. This relates to the brewery, distillery, vintner, bartender, etc.
  maker: { type: String, required: true },
  // Next is the origin/region the food came from if known
  origin: { type: String },
  // Location is where the user had the food or drink.
  location: { type: String },
  // Next comes notes which is also a string but is not required.
  notes: { type: String },
  // Date the user had the food. Defaults to the date created.
  date: { type: Date, default: Date.now() },
  // userID associated with record
  userID: { type: String, required: true },
  // Last is date with a schemaType of date and we set the default value to Date.now, as this is not something the user will enter, but will simply keep track of when the record was created.
  dateCreated: { type: Date, default: Date.now }
});

// When you call mongoose.model() on a schema, Mongoose compiles a model for you.
// The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name. Thus, for the example here, the model food is for the books collection in the database.

// Note: The .model() function makes a copy of schema. Make sure that you've added everything you want to schema, including hooks, before calling .model()!
const Fnb = mongoose.model("Fnb", fnbSchema);
// Finally we export the fnb model for use by our other files.
module.exports = Fnb;
