require('dotenv').config()
const env = process.env

//pretty self explanatory, just validates that a string is type UUID.
const validateUUID = uuid => {
    const uuidRegex = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
    return uuidRegex.test(uuid)
}

const validateEmail = email => {
    const emailRegex = new RegExp(/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/)
    return emailRegex.test(email)
}

//typeconverter
//if value of a database field is "integer" or "real", then type is "number"
//if value of a database field is "text" or "character varying", then type is "string"
//if value of a database field is "uuid" - don't need to account for this
//as uuid type columns do not receive data from client.

const convertEnvTypes = envVal => {
    let type = ""
    envVal === "integer" || envVal == "real" ? type += "number"
        : envVal === "text" || envVal === "character varying" ? type += "string"
        : type += envVal
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

        //if the value is a string that can be parsed into a number with parseInt, parse it
        if(!isNaN(parseInt(requestObject[prop]))) {
            requestObject[prop] = parseInt(requestObject[prop])
        }
        if(!ENVfields.hasOwnProperty(prop)) {
            throw Error(`The key, ${prop}, you are looking for is not present in the DB`)
        //validate email
        } else if(prop === "email") {
            if(convertEnvTypes(ENVfields[prop]) !== typeof requestObject[prop] || !validateEmail(requestObject[prop])) {
                throw Error(`${prop}: ${typeof requestObject[prop]}, did not match the env var ${ENVfields[prop]}: ${convertEnvTypes(ENVfields[prop])}.`)
            }
        //see if the request object's values are of the 
        //correct type
        } else if(convertEnvTypes(ENVfields[prop]) !== typeof requestObject[prop]) {
            throw Error(`${prop}: ${typeof requestObject[prop]}, did not match the env var ${ENVfields[prop]}: ${convertEnvTypes(ENVfields[prop])}.`)
        }
    }
}

//if validation fails, errors will throw the execution to the catch block,
//which returns false to the API.
//if validation is successful, true will be returned.
const validateRequestBody = requestBody => {
   //choose env var to compare against
    try {
        for(const table in requestBody) {
            switch(table) {
                case("users"):
                    validateRequestKeysVals(env.USERS_FIELDS, requestBody[table])
                    break
                case("locations"):
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
        return true
    } catch (e) {
        console.error({msg: 'Error from validateKeys'}, e)
        return false
    }
}

//this function checks the values of an object's keys for null/empty values.
//if they are found to contain null or empty values, we remove those properties
//from the object so that the validation runs correctly.
//This is because the above validation does not account for null/empty/falsey values, it assumes
//that the values of the key-value pairs are populated with data (truthy),
//and just validates their type.

//call this on create(post) and update(put) routes!!!!
const formatObject = (object) => {
    const objectCopy = object
    for(const prop in objectCopy) {
        //if the property is an object
        if(typeof objectCopy[prop] === "object" && !Array.isArray(objectCopy[prop])) {
            //if the property is an object, loop through it by 
            //calling the function again, passing in the property
            console.log(`prop: ${prop}: ${JSON.stringify(objectCopy[prop])}`)
            formatObject(objectCopy[prop])
        }
        if(!objectCopy[prop] || JSON.stringify(objectCopy[prop]) === "{}") {
            //if the pe
            console.log(`prop to delete: ${prop}: ${JSON.stringify(objectCopy)}`)
            delete objectCopy[`${prop}`]
            formatObject(objectCopy)
        }
    }
    return objectCopy
}
    

module.exports = {
    formatObject,
    validateRequestBody,
    validateUUID,
    validateEmail
}