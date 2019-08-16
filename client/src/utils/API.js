// Promise based HTTP client for the browser and node.js
import axios from "axios";
// the export of this file can then be used later in pages and compenents as needed. ex Fnbs.js and Detail.js
// These front end api calls are hit either when a component mounts, or when a user clicks on a link or a submit button. They then use axios to kick off the backend routes.
export default {
  // Gets all fnbs
  getFnbs: function() {
    return axios.get("/api/fnbs");
  },
  // Gets the fnb with the given id
  getFnb: function(id) {
    return axios.get("/api/fnbs/" + id);
  },
  // Deletes the fnb with the given id
  deleteFnb: function(id) {
    return axios.delete("/api/fnbs/" + id);
  },
  // Saves a fnb to the database
  saveFnb: function(fnbData) {
    return axios.post("/api/fnbs", fnbData);
  },
  // Updates the fnb with the corresponding id in the database
  updateFnb: function(id, fnbData) {
    return axios.put("/api/fnbs/" + id, fnbData);
  },
  // Gets all entries
  getEntries: function() {
    return axios.get("/api/entries");
  },
  // Gets the entry with the given id
  getEntry: function(id) {
    return axios.get("/api/entries/" + id);
  },
  // Deletes the entry with the given id
  deleteEntry: function(id) {
    return axios.delete("/api/entries/" + id);
  },
  // Saves aa entry to the database
  saveEntry: function(entryData) {
    console.log(entryData);
    return axios.post("/api/entries", entryData);
  },
  // Updates the entry with the corresponding id in the database
  updateEntry: function(id, entryData) {
    return axios.put("/api/entries/" + id, entryData);
  },
  //logs in user
  login: function(loginInfo) {
    return axios.post("/api/users/login", loginInfo);
  },

  //signs up user, then logs them in
  signup: function(signupInfo) {
    return axios.post("/api/users/signup", signupInfo);
  },

  //check if user is logged in, the return the user
  isLoggedIn: function() {
    return axios.get("/api/users/profile");
  },
  // populates the user with their Tasting Notes
  getUserFnbs: function(id) {
    return axios.get(`/api/users/userFnbs/${id}`);
  },

  updateUserFnbs: function(id) {
    return axios.put(`/api/fnbs/${id}`);
  },
  // populates the user with their Diary Entries
  getUserEntries: function(id) {
    return axios.get(`/api/users/userEntries/${id}`);
  },

  updateUserEntries: function(id) {
    return axios.put(`/api/users/userEntries/${id}`);
  },

  //checks to see if the user is logged in and andmin, then returns the user
  //I think this may need to be changed to /api/users/admin
  isAdmin: function() {
    return axios.get("/api/users/logout");
  },

  //logs out the user
  logout: function() {
    return axios.get("/api/users/logout");
  }
};
