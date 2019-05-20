// Creates a new router object.
const router = require("express").Router();
// Give index access to the routes
const drinkRoutes = require("./drinks");
const foodRoutes = require("./foods");
const diaryRoutes = require("./diaries");
const fnbRoutes = require("./fnbs");
const userRoutes = require("./users");

// diary routes
router.use("/diaries", diaryRoutes);
// drink routes may not be needed
router.use("/drinks", drinkRoutes);
// food routes may not be needed
router.use("/foods", foodRoutes);
// fnb routes may replace food and drinks above
router.use("/fnbs", fnbRoutes);
// user routes
router.use("/users", userRoutes);


// Exports router to be used in index.js of the routes folder.
module.exports = router;
