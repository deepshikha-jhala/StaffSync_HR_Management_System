const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

const {
getEmployees,
addEmployee,
deleteEmployee,
updateEmployee
} = require('../controllers/employeeController');

router.get('/', protect, authorizeRoles('HR'), getEmployees);
router.post('/', protect, authorizeRoles('HR'), addEmployee);
router.delete('/:id', protect, authorizeRoles('HR'), deleteEmployee);
router.put('/:id', protect, authorizeRoles('HR'), updateEmployee);

module.exports = router;

