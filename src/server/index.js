const app = require('./app')
const port = process.env.PORT || 6969

const storeFieldsInfo = require('./validation/storeFieldsInfo')

app.listen(port, async function () {
 await storeFieldsInfo(['users', 'listings', 'locations', 'likes'])
 console.log(`🚀🚀🚀 App listening on port: ${port} 🚀🚀🚀`);
 console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
});