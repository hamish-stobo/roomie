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
    const ads = await db('advertisements')
        .select()
    return ads
}

const selectAllAdsJoinLocationInterest = async (db = conn) => {
    try {
        //this will return an array of ads, joining the location table where
        //advertisements.id equals location.advertisement_id and where
        //location.user_id is null
        const ads = await db
            .select('rent', 'suburb', 'postcode', 'interest.user_id', 'interest.advertisement_id')
            .from('advertisements')
            .join('location', 'advertisement_id', '=', 'advertisements.id')
            .whereNull('location.user_id')
            .join('interest', 'interest.advertisement_id', '=', 'advertisements.id')
        // console.log(`A fine selection of ads my dear sir: \n${JSON.stringify(ads)}`)

        console.log(ads.length)
        const structuredArr = []
        // let interestArr = []
        if(ads.length == 0) return []
        ads.map((ad, idx) => {
            console.log(`ad.user_id: ${ad.user_id}`)
            // interestArr.push({user_id: ad.user_id})
            // console.log(`interestArr: ${JSON.stringify(interestArr)}`)
            if(structuredArr.length == 0 || structuredArr.find(el => el.advertisement_id !== ad.advertisement_id)) {
                console.log(`ads[idx].advertisement_id: ${ads[idx].advertisement_id}`)
                console.log(`ad.advertisement_id: ${ad.advertisement_id}`)
                structuredArr.push(
                    {
                        advertisement_id: ad.advertisement_id,
                        rent:  ad.rent,
                        postcode: ad.postcode,
                        interestArr: [ad.user_id]
                    }
                )
            } else {
                if(structuredArr[structuredArr.length-1].hasOwnProperty('interestArr')) {
                    structuredArr[structuredArr.length-1].interestArr.push(ad.user_id)
                }
            }
        })
        console.log(JSON.stringify(structuredArr))
        console.log(`Structured array length: ${structuredArr.length}`)
    } catch (e) {
        console.error({msg: 'Error from selectAllAds db function'}, e)
    }
}

module.exports = {
    getUsers,
    selectAllads,
    selectAllAdsJoinLocationInterest
}
