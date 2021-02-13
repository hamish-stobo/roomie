const express = require('express');
const path = require('path');
const db = require('./db/db')
const usersFunctions = require('./db/dbfunctions/users')
const adsFuntions = require('./db/dbfunctions/advertisements')
let cors = require('cors')

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

app.get('/getUsers', async (req, res) => {
  try {
    const users = await usersFunctions.getUsers()
    res.send(JSON.stringify(users))
  } catch (e) {
    console.error({msg: 'Error from /getUsers'},e)
  }
})

app.get('/selectAllads', async (req, res) => {
  try {
    const adsRes = await adsFuntions.selectAllads()
    res.send(JSON.stringify(adsRes))
  } catch (e) {
    console.error({msg: 'Error from /selectAllads'}, e)
  }
})

app.get('/api', (req, res) => {
  res.send(mockResponse);
});

app.get('/', (req, res) => {
 res.sendFile(HTML_FILE);
});

app.listen(port, function () {
 console.log('App listening on port: ' + port);
 console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
});