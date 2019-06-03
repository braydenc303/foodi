// Promise based HTTP client for the browser and node.js
import axios from "axios";
// the export of this file can then be used later in pages and compenents as needed. ex Books.js and Detail.js
// These front end api calls are hit either when a component mounts, or when a user clicks on a link or a submit button. They then use axios to kick off the backend routes.
export default {
  // Gets all books
  getFnbs: function() {
    return axios.get("/api/fnbs");
  }, 
  // Gets the book with the given id
  getFnb: function(id) {
    return axios.get("/api/fnbs/" + id);
  },
  // Deletes the book with the given id
  deleteFnb: function(id) {
    return axios.delete("/api/fnbs/" + id);
  },
  // Saves a book to the database
  saveFnb: function(fnbData) {
    return axios.post("/api/fnbs", fnbData);
  },
  // Updates a book with the corresponding id in the database
  updateFnb: function(id, fnbData) {
    return axios.put("/api/fnbs/" + id, fnbData);
  }

};
