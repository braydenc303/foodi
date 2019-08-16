# Foodi

A MERN stack CRUD app with user authentication that allows a user to create their own tasting notes, and food diary entries. The tasting notes are used in order to keep track of anything from wine tastings to full restaurant experiences. The food diary is to be used for those who may be trying to determine the cause of a food sensitivity and can help a nutritionist to determine changes that may need to be made to a user's diet.

Additional technologies that were used in the production of this app are:

- Moment.js
- Bootstrap

---

## Todos

- [x] Finish wiring up functionality
  - [x] Wire up Details page (make this usable for both the Notes and Diary if possible.)
      - [x] Go back through activities in unit 20 and speak with Sarah about how to do this.
      I don't thing this is doable in this circumstance. Check with Sarah anyway
  - [x] Wire up Entries page (Go back and see if you can do this with one page for both Notes and Diary)
  - [x] Format times
  - [x] Add options to nav bar
  - [x] Re-write login and sign up html to get rid of current errors in console
  - [x] Dig into memembo an look at what was done there for user authentication
  - [x] Add in user login/authentication
      - [x] Wire up Sign up
      - [x] Wire up login
      - [x] Get users to populate with proper entries in diary and tasting notes.
      - [x] Check for logged in on every page
      - [x] Add username in state onced logged in to attach that to each entry
      - [x] update proper arrays with id's of new records on creation
          - [x] update the controllers
          - [x] add the user id to req.body
      - [x] Go back and take a look at the logic for this. I think that a good portion of this should be unnecessary.
  - [x] Make Login the landing page
  - [x] Once Logged in, make the current landing page take the place of the profile page.
  - [x] Display Notes or Diary after that
  - [x] Find the bug stopping re-render
  - [x] Find out how to remove a record from a populated array
  - [x] Add a form to each detail page to allow the user to make changes to any entry
  - [x] Fix the time format on the Entry/ies pages
  - [ ] Go back in and clean up routes


---
- [ ] Figure out what the design should look like
  - [ ] Decide on fonts/color scheme
  - [ ] Create a layout
  - [ ] Add in some transitions/animation
  - [ ] Create a logo
