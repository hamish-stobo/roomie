const app = require('./app')
const port = process.env.PORT || 6969

const storeFieldsInfo = require('./validation/storeFieldsInfo')

app.listen(port, async function () {
 await storeFieldsInfo('users')
 await storeFieldsInfo('listings')
 await storeFieldsInfo('location')
 await storeFieldsInfo('likes')
 console.log(`🚀🚀🚀 App listening on port: ${port} 🚀🚀🚀`);
 console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
});