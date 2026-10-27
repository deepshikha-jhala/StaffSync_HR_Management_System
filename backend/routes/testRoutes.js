const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const { getProtectedData } = require('../controllers/testController');

router.get('/protected', protect, getProtectedData);

router.get('/hr-only', protect, authorizeRoles('HR'), getProtectedData);

module.exports = router;