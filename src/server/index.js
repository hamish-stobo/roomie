const app = require('./app')

const port = process.env.PORT || 6969;

app.listen(port, function () {
 console.log('App listening on port: ' + port);
 console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
});