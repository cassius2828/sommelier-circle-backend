const express = require('express')
const router = express.Router()
const tokenRouter = require('../controllers/test-jwt')

router.post('/verify-token', tokenRouter.verify)
router.post('/refresh-token', tokenRouter.refresh)

module.exports = router;