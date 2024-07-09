const express = require('express')
const router = express.Router()
const profileCtrl = require('../controllers/profiles')

const verifyToken = require('../middleware/verify-token')


router.get('/:userId', verifyToken, profileCtrl.profile)


module.exports = router