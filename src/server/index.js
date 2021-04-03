const app = require('./app')
const port = process.env.PORT || 8000

app.listen(port, async function () {
 console.log(`🚀🚀🚀 App listening on port: ${port} 🚀🚀🚀`);
 console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
});