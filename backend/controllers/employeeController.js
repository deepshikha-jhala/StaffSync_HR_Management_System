const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get all registered users
const getEmployees = async (req, res) => {
    try {
        const employees = await User.find()
            .select('-password')
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: employees.length,
            employees
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch employees'
        });
    }
};

// Add a new employee
const addEmployee = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Please provide name, email and password'
            });
        }

        const existingUser = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (existingUser) {
            return res.status(400).json({
                message: 'An account with this email already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const employee = await User.create({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password: hashedPassword,
            role: 'Employee'
        });

        res.status(201).json({
            message: 'Employee added successfully',
            employee: {
                _id: employee._id,
                name: employee.name,
                email: employee.email,
                role: employee.role
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to add employee'
        });
    }
};


// Delete an employee
const deleteEmployee = async (req, res) => {
    try {
        const employee = await User.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({
                message: 'Employee not found'
            });
        }

        if (employee.role !== 'Employee') {
            return res.status(403).json({
                message: 'Only employee accounts can be deleted'
            });
        }

        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: 'Employee deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete employee'
        });
    }
};

// Update employee details
const updateEmployee = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: 'Please provide name and email'
            });
        }

        const employee = await User.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({
                message: 'Employee not found'
            });
        }

        if (employee.role !== 'Employee') {
            return res.status(403).json({
                message: 'Only employee accounts can be updated'
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: normalizedEmail,
            _id: { $ne: employee._id }
        });

        if (existingUser) {
            return res.status(400).json({
                message: 'This email address is already registered'
            });
        }

        employee.name = name.trim();
        employee.email = normalizedEmail;

        await employee.save();

        res.status(200).json({
            message: 'Employee updated successfully',
            employee: {
                _id: employee._id,
                name: employee.name,
                email: employee.email,
                role: employee.role
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to update employee'
        });
    }
};


module.exports = {
    getEmployees,
    addEmployee,
    deleteEmployee,
    updateEmployee
};
