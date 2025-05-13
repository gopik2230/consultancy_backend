// routes/authRoutes.js
const express = require('express');
const { signup, login, companyProfileInfo } = require('../controllers/authController');
const { postJobInternal, getPostedJobList } = require('../controllers/JobPost');

const router = express.Router();

// POST /signup route
router.post('/signup', signup);
router.post('/login', login);
router.post('/companyProfile', companyProfileInfo);
router.post('/internal-job', postJobInternal);
router.get('/internal/list', getPostedJobList); // New route

module.exports = router;
