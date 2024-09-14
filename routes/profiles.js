const express = require('express')
const router = express.Router()
const profileCtrl = require('../controllers/profiles')
const multer = require('multer')
const verifyToken = require('../middleware/verify-token')
const upload = multer()


router.get('/search/:query', profileCtrl.getSearchUsers)
router.post('/:userId/follow/:otherUser', verifyToken, profileCtrl.postFollowUser)
router.post('/:userId/unfollow/:otherUser', verifyToken, profileCtrl.postUnfollowUser)
router.put('/:userId', upload.single('photo'), profileCtrl.putEditUserInfo)
router.get('/:userId', profileCtrl.profile)

module.exports = router