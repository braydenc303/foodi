const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "username is required"]
    },
    password: {
        type: String,
        unique: false,
        validate: {
            validator: function(v) {
                return /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(v);
            },
            message: props => `${props.value} is not a valid password`
        },
        required: [true, "password is required"]
    },
    admin: {
        type: Boolean,
        unique: false,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    // hoping the food and drink can be deleted and handles by the fnb
    foodArray: [
      {
        type: Schema.Types.ObjectId,
        ref: "Food"
      }
    ],    
    drinkArray: [
      {
        type: Schema.Types.ObjectId,
        ref: "Drink"
      }
    ],    
    fnbArray: [
      {
        type: Schema.Types.ObjectId,
        ref: "Fnb"
      }
    ],
    entryArray: [
      {
        type: Schema.Types.ObjectId,
        ref: "Entry"
      }
    ]
});

usersSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

usersSchema.methods.validPassword = function(password, encrypted) {
    return bcrypt.compareSync(password, encrypted);
}

const User = mongoose.model("User", usersSchema);

module.exports = User;