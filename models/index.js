// This file exports all of the models in the folder, making them available to our controllers.
module.exports = {
  Entry: require("./entry"),
  // Hopefully Fnb will handle both food and drink
  Fnb: require("./fnb"),
  User: require("./user")
};
