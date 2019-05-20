// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const bookSchema = new Schema({
  // The first key in our schema is named title, it has a schemaType of string and it is a required value.
  title: { type: String, required: true },
  // The next key is named author, it has a schemaType of string and it is also a required value.
  author: { type: String, required: true },
  // Next comes synopsis which is also a string but is not required.
  synopsis: String,
  // Last is date with a schemaType of date and we set the default value to Date.now, as this is not something the user will enter, but will simply keep track of when the record was created.
  date: { type: Date, default: Date.now }
});

// When you call mongoose.model() on a schema, Mongoose compiles a model for you.
// The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name. Thus, for the example here, the model Book is for the books collection in the database.

// Note: The .model() function makes a copy of schema. Make sure that you've added everything you want to schema, including hooks, before calling .model()!
const Book = mongoose.model("Book", bookSchema);
// Finally we export the book model for use by our other files.
module.exports = Book;
