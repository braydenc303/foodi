// Creates a new router object.
const router = require("express").Router();
// Give index access to the routes
const drinkRoutes = require("./drinks");
const foodRoutes = require("./foods");
const diaryRoutes = require("./diaries");
const userRoutes = require("./users");

// diary routes
router.use("/diaries", diaryRoutes);
// drink routes
router.use("/drinks", drinkRoutes);
// food routes
router.use("/foods", foodRoutes);
// user routes
router.use("/users", userRoutes);


// Exports router to be used in index.js of the routes folder.
module.exports = router;
