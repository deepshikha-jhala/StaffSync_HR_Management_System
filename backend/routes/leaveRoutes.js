const express = require('express');
const router = express.Router();

const {
applyLeave,
getLeaves,
updateLeaveStatus
} = require('../controllers/leaveController');

const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

// Apply for leave
router.post('/', protect, applyLeave);

// View leave applications
router.get('/', protect, getLeaves);

// Only HR can approve or reject leave
router.put('/:id', protect, authorizeRoles('HR'), updateLeaveStatus);

module.exports = router;
