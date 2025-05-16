// routes/authRoutes.js
const express = require('express');
const { signup, login, companyProfileInfo, candidateSignup } = require('../controllers/authController');
const { postJobInternal, getPostedJobList } = require('../controllers/JobPost');
const verifyClientToken = require("../middleware/clientMiddleware")

const router = express.Router();

// POST /signup route
router.post('/signup', signup);
router.post('/candidate-signup', candidateSignup);
router.post('/login', login);
router.post('/companyProfile', companyProfileInfo);
// router.post('/internal-job', verifyClientToken, postJobInternal);
// router.get('/job/list', verifyClientToken, getPostedJobList); // New route

module.exports = router;
