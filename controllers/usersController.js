const db = require("../models");

// Defining methods for the userController

module.exports = {
  // find all users and sort descending by time created at then send that information to the front in json format.
    findAll: function(req, res) {
        db.User
            .find(req.query)
            .sort({ createdAt: -1})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // find one user by id provided
    findById: function(req, res) {
        db.User
            .findById(req.params.id)
            // Here we need to populate the user with their associated collections/records
            .populate("")
            .then(dbModel => {

                
                console.log("usercontroller");
                console.log(dbModel);
                res.json(dbModel);
            })
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        db.User
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
        db.User
            .findOneAndUpdate({ _id: req.params.id}, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.User
            .findById({_id: req.params.id})
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};