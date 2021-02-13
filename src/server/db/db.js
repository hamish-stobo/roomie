const environment = process.env.NODE_ENV || 'development'
const config = require('../../../knexfile')[environment]
const conn = require('knex')(config)
const { v4: uuidv4 } = require('uuid')

const getUsers = async (db = conn) => {
    try {
        const response = await db('users').select()
        return response
    } catch (e) {
        console.error({msg: 'Error from getUsers db function'}, e)
    }
}

const selectAllads = async (db = conn) => {
    const ads = await db
        .select('location.advertisement_id','rent')
        .from('advertisements')
        .join('location', 'advertisement_id', '=', 'advertisements.id')
        .whereNull('location.user_id')
    return ads
}

const getInterestsForAds = async (db = conn) => {
    try {
        //get the ads and their locations
        const adsArr = await selectAllads()

        //if no ads, don't query the interest table
        if(adsArr.length == 0) {
            console.log('no ads yo')
            return []
        }

        //get all the users interest records
        const interests = await db
            .select('interest.user_id', 'interest.advertisement_id')
            .from('advertisements')
            .join('interest', 'interest.advertisement_id', '=', 'advertisements.id')
        
        //we add this return before trying to loop over the interest array, so we account for
        //if there are no interest found in the interest table.
        if(interests.length == 0) {
            console.log('no likes yo')
            return adsArr
        }
        //if there are ads found, do some crazy shiet
        console.log(JSON.stringify(adsArr))
        console.log(JSON.stringify(interests))
        //loop over interest array
        interests.map(interest => {
            //find the position in the ads array to insert the array of interested users for that ad
            console.log(`interest: ${JSON.stringify(interest)}`)
            let indexToChange = adsArr.findIndex(ad => ad.advertisement_id == interest.advertisement_id)
            console.log(`indexToChange: ${JSON.stringify(indexToChange)}`)

            let ad = adsArr[indexToChange]
            console.log(`ad: ${JSON.stringify(ad)}`)
            
            //if the current ad doesn't have any interests, and there are some to add, add them
            if(!ad.hasOwnProperty('interestArr')) {
                    ad.interestArr = interest.user_id && [{user_id: interest.user_id}]
            } else {
                //otherwise, if the current ad DOES have interestArr, and there are some to add, add them
                if(ad.hasOwnProperty('interestArr')){
                    interest.user_id && ad.interestArr.push({user_id: interest.user_id})
                }
            }
        })
        return adsArr
    } catch (e) {
        console.error({msg: 'Error from selectAllAds db function'}, e)
    }
}

module.exports = {
    getUsers,
    selectAllads,
    getInterestsForAds
}
