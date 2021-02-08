const express = require('express');
const path = require('path');
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

//testing DB connectivity

var pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native

// var conString = "postgres://mqddlydk:SwMjGnaSXKmOj1rC6XLOmDUxqK-BBrRS@rosie.db.elephantsql.com:5432/mqddlydk" //Can be found in the Details page
// var client = new pg.Client(conString);
// client.connect(function(err) {
//   if(err) {
//     return console.error('could not connect to postgres', err);
//   }
//   client.query('SELECT NOW() AS "theTime"', function(err, result) {
//     if(err) {
//       return console.error('error running query', err);
//     }
//     console.log(result.rows[0].theTime);
//     // >> output: 2018-08-23T14:02:57.117Z
//     client.end();
//   });
// });