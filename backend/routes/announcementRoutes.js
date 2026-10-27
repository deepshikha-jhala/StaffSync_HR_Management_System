const express = require('express');
const router = express.Router();

const {
    createAnnouncement,
    getAnnouncements,
    deleteAnnouncement
} = require('../controllers/announcementController');

const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

// HR can publish announcements
router.post('/', protect, authorizeRoles('HR'), createAnnouncement);

// All logged-in users can view announcements
router.get('/', protect, getAnnouncements);

// HR can delete announcements
router.delete('/:id', protect, authorizeRoles('HR'), deleteAnnouncement);

module.exports = router;