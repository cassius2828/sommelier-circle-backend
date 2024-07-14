const express = require('express')
const router = express.Router()
const wineCtrl = require('../controllers/wines')



router.get('/search', wineCtrl.getAllWines)
router.post('/search', wineCtrl.postFilterWineResults)
router.get('/:wineId', wineCtrl.getSelectedWine)



module.exports = router