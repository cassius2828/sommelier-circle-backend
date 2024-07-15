const express = require('express')
const router = express.Router()
const profileCtrl = require('../controllers/profiles')

const verifyToken = require('../middleware/verify-token')



router.get('/search/:query', profileCtrl.getSearchUsers)
router.post('/:userId/follow/:otherUser', verifyToken, profileCtrl.postFollowUser)
router.post('/:userId/unfollow/:otherUser', verifyToken, profileCtrl.postUnfollowUser)
router.get('/:userId', profileCtrl.profile)

module.exports = router