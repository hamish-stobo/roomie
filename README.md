# rOOmie

This is the project repo for Roomie, an app build on the PERN stack. 
The app is live at [r00mie.herokuapp.com](http://r00mie.herokuapp.com)

## MVP User Stories

# As a Renter:
- I want to be able to create an account
- I want to be able to login to an account that I have created
- I want to be able to see a list of available rooms for rent
- I want to be able to like a listing

# As a Lister
- I want to be able to list an advert
- I want to be able to see how much interest there is in an advert
- I want to be able to remove an advert
- I want to be able to contact users

### What is the problem?

The idea here was to build an app to make finding a flat or advertising for a spare room in a flat a seamless, easy process. 
The app would provide an instagram-like experience for users to see listed adverts, and have a profile page where they could list their contact info.

## Getting up and Running

### The Technology

The app is built on an Express API (connecting to a PostgreSQL database) with React on the Frontend. Heroku was used for deployment, along with their Postgres database add-on.
Auth is handled using JWT cookies, using the 'jsonwebtoken' package from NPM.


### Running Roomie in Development

1. In the project's root directory, create a file called `.env` and paste the following. Be sure to change the credentials to your Postgres credentials.

   ```javascript
    DEV_DB_URL=[YOUR_DATABASE_URL];
    NODE_ENV=development;
    SECRET=[YOUR_SECRET_KEY];
   ```

2. Install the app's dependencies by running:

   ```
   $ npm install
   ```

4. To start both the Express API and React App in development mode, run the following in the root directory:

   ```
   $ npm run dev
   ```
   
   And navigate to localhost:8000 in your browser. You will be presented with a page to login: 
   ![roomieLandingPage](https://user-images.githubusercontent.com/51815749/114248835-e4822c80-99ec-11eb-8157-59dd55596594.png)

   **Note:** To start the server or client independently: `$ npm run nodemon` or `$ npm run wp-server` respectively. However, the front end is dependent on the API and will not fully function without it.

---

### See something that can be improved?

While this is not an active project, feel free to submit a Pull Request if you can improve this repository, or open an issue should you encounter a bug. 🐞
