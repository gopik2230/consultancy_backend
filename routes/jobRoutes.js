// routes/authRoutes.js
const express = require('express');
const { postJobInternal, getPostedInternalJobList, getPostedExternalJobList } = require('../controllers/JobPost');
const verifyClientToken = require("../middleware/clientMiddleware")
const verifyRoles = require("../middleware/verifyRoles")

const router = express.Router();

router.post('/internal-job', verifyClientToken, postJobInternal);
router.get('/internal-job/list', verifyRoles(1,2), getPostedInternalJobList);
router.get('/external-job/list', verifyRoles(1,2), getPostedExternalJobList);

module.exports = router;
