const express = require('express');
const path = require('path');
const db = require('./db/db')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../', '../dist'); 
const HTML_FILE = path.join(DIST_DIR, 'index.html'); 
const mockResponse = {
  foo: 'bar',
  bar: 'foo'
};
app.use(express.static(DIST_DIR));

app.get('/getUsers', async (req, res) => {
  try {
    const users = await db.getUsers()
    res.send(JSON.stringify(users))
  } catch (e) {
    console.error(e)
  }
})

app.get('/testAdsSeed', async (req, res) => {
  try {
    const adsRes = await db.manualAdvertisementsSeed()
    res.send(JSON.stringify(adsRes))
  } catch (e) {
    console.error(e)
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