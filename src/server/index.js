const express = require('express');
const path = require('path');
const usersFunctions = require('./db/dbfunctions/users')
const listingsFunctions = require('./db/dbfunctions/listings')
const cors = require('cors')

require('dotenv').config();



const app = express();

const port = process.env.PORT || 6969;
const DIST_DIR = path.join(__dirname, '../', '../dist'); 
const HTML_FILE = path.join(DIST_DIR, 'index.html'); 
const mockResponse = {
  foo: 'bar',
  bar: 'foo'
};

app.use(cors())

app.use(express.static(DIST_DIR));

app.get('/profile/:first_name', async (req, res) => {
  try {
    const userFirstName = req.params.first_name
    const profile = await usersFunctions.getUser(userFirstName)
    res.send(JSON.stringify(profile))
  } catch (e) {
    console.error({msg: 'Error from /getUsers'}, e)
    res.send
  }
})

app.get('/home', async (req, res) => {
  try {
    const listingsAndLikes = await listingsFunctions.selectAllListings()
    res.send(JSON.stringify(listingsAndLikes))
  } catch (e) {
    console.error({msg: 'Error from /home'}, e)
  }
})

app.get('/api', (req, res) => {
  res.send(mockResponse);
});

app.get('/', (req, res) => {
 res.sendFile(HTML_FILE);
});

app.get('/teapot', async (req, res) => {
  try {
    res.status(418).send(JSON.stringify({
      isTeapot: 'true',
      teaType: 'Earl Grey',
      message: 'I\'m a little teapot, short and stout. You found the easter egg! Celebrate! Shout!'
    }))
  } catch (e) {
    console.error({msg: 'Error from the teapot route hahaha'}, e)
  }
})

app.listen(port, function () {
 console.log('App listening on port: ' + port);
 console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
});