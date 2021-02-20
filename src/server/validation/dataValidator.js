require('dotenv').config()
const env = process.env

//pretty self explanatory, just validates that a string is type UUID.
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
    envVal === "integer" || envVal == "real" ? type += "number"
        : envVal === "text" || envVal === "character varying" ? type += "string"
        : type += envVal
    return type
        
        // switch(envVal) {
        //     case "integer":
        //         type += "number"
        //         break
        //     case "real":
        //         type += "number"
        //         break
        //     case "text":
        //         type += "string"
        //         break
        //     case "character varying":
        //         type += "string"
        //         break
        //     default:
        //         type += envVal
        //         break
        // }
        // return type
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

const formatObject = object => {
    const formattedObject = object
    let flag = false
    //loop over the object
    //if the property is an object
    //loop over the object
    //if the property is true
    //add it to parent
    const childFunction = obj => {
        for(const prop in obj) {
            if(typeof obj[prop] === "object" && !Array.isArray(obj[prop])) {
                childFunction(obj[prop])
            } else if(!obj[prop] || JSON.stringify(obj[prop]) === "{}") {
                delete formattedObject[prop]
                childFunction(formattedObject)
            }
        }
        flag = true
    }
    if(flag === false) {
        childFunction(formattedObject)
    }
    console.log(`object to return: ${JSON.stringify(formattedObject)}`)
    return formattedObject
    }
    // for(let i = 0; i < propsArr.length; i++) {
    //     let key = propsArr[i]
    //     //if the property is truthy
    //     if(!!object[key] && JSON.stringify(object[key]) !== "{}") {
    //         formattedObject[key] = object[key]
    //     //if the property is an object, we run this whole function again
    //     } else if(typeof object[key] === "object" && !Array.isArray(object[key])) {
    //         console.log(`object[key] is non-empty object: ${object[key]}`)
    //         formatObject(formattedObject)
    //     }
    // }
    

module.exports = {
    formatObject,
    validateRequestBody,
    validateUUID
}