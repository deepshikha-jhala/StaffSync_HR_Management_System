const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');

const {
markAttendance,
getAttendance
} = require('../controllers/attendanceController');

router.post('/mark', protect, markAttendance);
router.get('/', protect, getAttendance);

module.exports = router;
