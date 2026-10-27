const Attendance = require('../models/Attendance');
const User = require('../models/User');

// Mark attendance
const markAttendance = async (req, res) => {
try {
const { status } = req.body;

    if (!['Present', 'Absent'].includes(status)) {
        return res.status(400).json({
            message: 'Status must be Present or Absent'
        });
    }

    const today = new Date().toISOString().split('T')[0];

    const attendance = await Attendance.findOneAndUpdate(
        { employee: req.user._id, date: today },
        { status },
        { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({
        message: 'Attendance marked successfully',
        attendance
    });
} catch (error) {
    res.status(500).json({
        message: 'Failed to mark attendance'
    });
}

};

// View attendance records
const getAttendance = async (req, res) => {
try {
const filter = {};

    if (req.user.role !== 'HR') {
        filter.employee = req.user._id;
    }

    const attendance = await Attendance.find(filter)
        .populate('employee', 'name email role')
        .sort({ date: -1 });

    res.status(200).json({
        count: attendance.length,
        attendance
    });
} catch (error) {
    res.status(500).json({
        message: 'Failed to fetch attendance records'
    });
}

};

module.exports = {
markAttendance,
getAttendance
};
