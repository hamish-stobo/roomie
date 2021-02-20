require('dotenv').config()
const { v4: uuidv4, validate } = require('uuid')

const {
    USERS_FIELDS,
    LISTINGS_FIELDS,
    LOCATIONS_FIELDS,
    LIKES_FIELDS
} = process.env

const compareUserKeys = (table, body) => {
    //compare the keys of the incoming object with the object in the 
    //env variable.
    //if the incoming object has a key that is NOT 
    //in the table where a record is being put/posted/deleted,
    //throw an error unhappy face and don't let them continue.

}

//here we want to compare that that names of the fields
//of the request body are the same of the names of the fields
//in the database,

//and also that the data types of each field coming from the client
//are the same as the data types of the fields which they
//are being inserted into.

//data types:
//uuid, character varying, integer, text, real (2dp), 
//postcode is type integer
//rent is type real(2dp)

//typeconverter
//if value of a database field is "integer" or "real", then type is "number"
//if value of a database field is "text" or "character varying", then type is "string"
//if value of a database field is "uuid", then we must use



module.exports = dataValidator