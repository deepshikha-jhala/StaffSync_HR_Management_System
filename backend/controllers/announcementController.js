const Announcement = require('../models/Announcement');

// Publish a new announcement
const createAnnouncement = async (req, res) => {
    try {
        const { title, message } = req.body;

        if (!title || !message) {
            return res.status(400).json({
                message: 'Title and message are required'
            });
        }

        const announcement = await Announcement.create({
            title,
            message,
            createdBy: req.user._id
        });

        res.status(201).json({
            message: 'Announcement published successfully',
            announcement
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all announcements
const getAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find()
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json(announcements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an announcement
const deleteAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);

        if (!announcement) {
            return res.status(404).json({
                message: 'Announcement not found'
            });
        }

        await announcement.deleteOne();

        res.status(200).json({
            message: 'Announcement deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createAnnouncement,
    getAnnouncements,
    deleteAnnouncement
};