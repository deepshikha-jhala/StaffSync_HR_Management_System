const express = require('express');
const router = express.Router();

const {
createTraining,
getTrainings,
deleteTraining
} = require('../controllers/trainingController');

const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

// HR and Managers can create training programs
router.post('/', protect, authorizeRoles('HR', 'Manager'), createTraining);

// All logged-in users can view training programs
router.get('/', protect, getTrainings);

// HR and Managers can delete training programs
router.delete('/:id', protect, authorizeRoles('HR', 'Manager'), deleteTraining);

module.exports = router;
