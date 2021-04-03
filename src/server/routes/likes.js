const router = require('express').Router()
const { addLike, removeLike } = require('../db/dbfunctions/likes')
const { validateToken } = require('../middleware/JWT')

router.post('/', validateToken, async (req, res) => {
    try {
        const { likes_user_id, likes_listing_id } = req.body
        const likeInsert = await addLike(likes_user_id, likes_listing_id)
        if(JSON.stringify(likeInsert) !== "{}") {
            res.status(200).send(JSON.stringify(likeInsert))
        }
    } catch (e) {
        console.error(`Error in POST likes ${e}`)
        res.status(500).send(`Error in POST likes ${e}`)
    }
})

router.delete('/:likes_listing_id/:likes_user_id', validateToken, async (req, res) => {
    try {
        const { likes_user_id, likes_listing_id } = req.params
        const deleteLike = await removeLike(likes_user_id, likes_listing_id)
        res.status(200).send(deleteLike)
    } catch (e) {
        console.error(`Error in DELETE likes ${e}`)
        res.status(500).send(`Error in DELETE likes ${e}`)
    }
})

module.exports = router