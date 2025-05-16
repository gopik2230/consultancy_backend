// routes/authRoutes.js
const express = require('express');
const { postJobInternal, getPostedJobList } = require('../controllers/JobPost');
const verifyClientToken = require("../middleware/clientMiddleware")

const router = express.Router();

router.post('/internal-job', verifyClientToken, postJobInternal);
router.get('/job/list', verifyClientToken, getPostedJobList);

module.exports = router;
