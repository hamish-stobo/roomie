require('dotenv').config()
const env = process.env


//pretty self explanatory, just validates UUID.
const validateUUID = uuid => {
    const uuidRegex = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
    return uuid.match(uuidRegex)
}

//typeconverter
//if value of a database field is "integer" or "real", then type is "number"
//if value of a database field is "text" or "character varying", then type is "string"
//if value of a database field is "uuid" - don't need to account for this
//as uuid type columns do not receive data from client.

const convertEnvTypes = envVal => {
    let type = ""
        switch(envVal) {
            case "integer":
                type += "number"
                break
            case "real":
                type += "number"
                break
            case "text":
                type += "string"
                break
            case "character varying":
                type += "string"
                break
            default:
                type += envVal
                break
        }
        return type
}

//this function compares field names in ENV variables to key names in the 
//request object coming from client.
//It also compares values of those keys those in the ENV variables.
//If discrepancy found, it will throw the appropriate error which 
//is handled in the parent function.

const validateRequestKeysVals = (ENVobject, requestObject) => {
    const ENVfields = JSON.parse(ENVobject)
    //loop over request object
    for(const prop in requestObject) {
        //see if the request object contains keys which don't
        //exist in the table being queried
        //if the value of the incoming request object can be parsed
        if(!isNaN(parseInt(requestObject[prop]))) {
            requestObject[prop] = parseInt(requestObject[prop])
        }
        if(!ENVfields.hasOwnProperty(prop)) {
            throw Error(`The key, ${prop}, you are looking for is not present in the DB`)
        //see if the request object's values are of the 
        //correct type
        } else if(convertEnvTypes(ENVfields[prop]) !== typeof requestObject[prop]) {
            throw Error(`${prop}: ${typeof requestObject[prop]}, did not match the env var ${ENVfields[prop]}: ${convertEnvTypes(ENVfields[prop])}.`)
        }
    }
}

const validateRequestBody = requestBody => {
   //choose env var to compare against
    try {
        for(const table in requestBody) {
            switch(table) {
                case("users"):
                    validateRequestKeysVals(env.USERS_FIELDS, requestBody[table])
                    break
                case("location"):
                    validateRequestKeysVals(env.LOCATIONS_FIELDS, requestBody[table])
                    break
                case("listings"):
                    validateRequestKeysVals(env.LISTINGS_FIELDS, requestBody[table])
                    break
                case("likes"):
                    validateRequestKeysVals(env.LIKES_FIELDS, requestBody[table])
                    break
            }
        }
       
    } catch (e) {
        console.error({msg: 'Error from validateKeys'}, e)
        return false
    }
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




module.exports = {
    validateRequestBody,
    validateUUID
}