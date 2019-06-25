// Creates a new router object.
const router = require("express").Router();
// Give index access to the routes
const entryRoutes = require("./entries");
const fnbRoutes = require("./fnbs");
const userRoutes = require("./users");

// entry routes
router.use("/entries", entryRoutes);
// fnb routes may replace food and drinks above
router.use("/fnbs", fnbRoutes);
// user routes
router.use("/users", userRoutes);


// Exports router to be used in index.js of the routes folder.
module.exports = router;
