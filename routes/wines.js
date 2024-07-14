const express = require('express')
const router = express.Router()
const wineCtrl = require('../controllers/wines')




router.get('/:wineId', wineCtrl.profile)


module.exports = router