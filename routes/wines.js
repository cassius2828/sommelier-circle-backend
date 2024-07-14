const express = require('express')
const router = express.Router()
const wineCtrl = require('../controllers/wines')



router.get('/search', wineCtrl.getAllWines)
router.get('/:wineId', wineCtrl.getSelectedWine)



module.exports = router