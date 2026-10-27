const Leave = require('../models/Leave');

// Employee applies for leave
const applyLeave = async (req, res) => {
    try {
        const { leaveType, startDate, endDate, reason } = req.body;

        if (!leaveType || !startDate || !endDate || !reason) {
            return res.status(400).json({
                message: 'Please fill in all fields'
            });
        }

        if (startDate > endDate) {
            return res.status(400).json({
                message: 'End date must be after or equal to start date'
            });
        }

        const leave = await Leave.create({
            employee: req.user._id,
            leaveType,
            startDate,
            endDate,
            reason
        });

        res.status(201).json({
            message: 'Leave application submitted successfully',
            leave
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get leave applications
const getLeaves = async (req, res) => {
    try {
      console.log('Logged-in user:', req.user.email);
      console.log('Logged-in role:', req.user.role);
        let leaves;

        if (req.user.role === 'HR' || req.user.role === 'Manager') {
            // HR and Managers can view all leave applications
            leaves = await Leave.find()
                .populate('employee', 'name email')
                .sort({ createdAt: -1 });
        } else {
            // Employees can view only their own leave applications
            leaves = await Leave.find({ employee: req.user._id })
                .populate('employee', 'name email')
                .sort({ createdAt: -1 });
        }

        res.status(200).json(leaves);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// HR approves or rejects leave
const updateLeaveStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!['Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({
                message: 'Status must be Approved or Rejected'
            });
        }

        const leave = await Leave.findById(req.params.id);

        if (!leave) {
            return res.status(404).json({
                message: 'Leave application not found'
            });
        }

        leave.status = status;
        await leave.save();

        res.status(200).json({
            message: `Leave ${status.toLowerCase()} successfully`,
            leave
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    applyLeave,
    getLeaves,
    updateLeaveStatus
};
