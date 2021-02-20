require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors')
const app = express();
app.use(cors())
const DIST_DIR = path.join(__dirname, '../', '../dist');
app.use(express.static(DIST_DIR));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//route modules
const listing = require('./routes/listing')
const profile = require('./routes/profile')
//routes
app.use('/api/v1/listing', listing)
app.use('/api/v1/profile', profile)

const HTML_FILE = path.join(DIST_DIR, 'index.html'); 
const mockResponse = {
  foo: 'bar',
  bar: 'foo'
};

app.get('/', (req, res) => {
 res.sendFile(HTML_FILE);
});

app.get('/api', (req, res) => {
  res.send(mockResponse);
});

//easter egg route for the lols
app.get('/teapot', async (req, res) => {
  try {
    res.status(418).send(JSON.stringify({
      isTeapot: 'true',
      teaType: 'Earl Grey',
      message: 'I\'m a little teapot, short and stout. You found the easter egg! Celebrate! Shout!'
    }))
  } catch (e) {
    console.error({msg: 'Error from the teapot route hahaha'}, e)
    res.status(404).send('You tried to find the teapot. You failed.')
  }
})

module.exports = app