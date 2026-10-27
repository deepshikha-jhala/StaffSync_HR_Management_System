import { useState } from 'react';
import './App.css';

function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user') || 'null')
    );

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const [employees, setEmployees] = useState([]);
    const [activePage, setActivePage] = useState('Dashboard');
    const [employeeMessage, setEmployeeMessage] = useState('');
    const [employeesLoading, setEmployeesLoading] = useState(false);

    const [showEmployeeForm, setShowEmployeeForm] = useState(false);
    const [employeeName, setEmployeeName] = useState('');
    const [employeeEmail, setEmployeeEmail] = useState('');
    const [employeePassword, setEmployeePassword] = useState('');
    const [editingEmployee, setEditingEmployee] = useState(null);

    const [attendance, setAttendance] = useState([]);
    const [attendanceMessage, setAttendanceMessage] = useState('');

    const [leaves, setLeaves] = useState([]);
    const [leaveMessage, setLeaveMessage] = useState('');
    const [leaveType, setLeaveType] = useState('Casual');
    const [leaveStartDate, setLeaveStartDate] = useState('');
    const [leaveEndDate, setLeaveEndDate] = useState('');
    const [leaveReason, setLeaveReason] = useState('');
    const [leaveLoading, setLeaveLoading] = useState(false);

    const [announcements, setAnnouncements] = useState([]);
    const [announcementMessage, setAnnouncementMessage] = useState('');
    const [announcementTitle, setAnnouncementTitle] = useState('');
    const [announcementText, setAnnouncementText] = useState('');
    const [announcementLoading, setAnnouncementLoading] = useState(false);

    const [trainings, setTrainings] = useState([]);
    const [trainingMessage, setTrainingMessage] = useState('');
    const [trainingTitle, setTrainingTitle] = useState('');
    const [trainingDescription, setTrainingDescription] = useState('');
    const [trainingTrainer, setTrainingTrainer] = useState('');
    const [trainingDate, setTrainingDate] = useState('');
    const [trainingLoading, setTrainingLoading] = useState(false);

    // Login
    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const response = await fetch(
                'http://localhost:5000/api/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            setUser(data.user);
            setActivePage('Dashboard');
        } catch (error) {
            setMessage(
                error.message || 'Unable to connect to the server.'
            );
        } finally {
            setLoading(false);
        }
    };

    // Fetch employees
    const fetchEmployees = async () => {
        setEmployeesLoading(true);
        setEmployeeMessage('');

        try {
            const response = await fetch(
                'http://localhost:5000/api/employees',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to load employees');
            }

            setEmployees(data.employees);
        } catch (error) {
            setEmployeeMessage(
                error.message || 'Unable to load employees'
            );
        } finally {
            setEmployeesLoading(false);
        }
    };

    // Add employee
    const handleAddEmployee = async (e) => {
        e.preventDefault();
        setEmployeeMessage('');
        setEmployeesLoading(true);

        try {
            const response = await fetch(
                'http://localhost:5000/api/employees',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        name: employeeName,
                        email: employeeEmail,
                        password: employeePassword
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to add employee');
            }

            setEmployeeName('');
            setEmployeeEmail('');
            setEmployeePassword('');
            setShowEmployeeForm(false);
            setEmployeeMessage('Employee added successfully!');

            await fetchEmployees();
        } catch (error) {
            setEmployeeMessage(
                error.message || 'Unable to add employee'
            );
        } finally {
            setEmployeesLoading(false);
        }
    };

    // Update employee
    const handleUpdateEmployee = async (e) => {
        e.preventDefault();
        setEmployeeMessage('');

        try {
            const response = await fetch(
                `http://localhost:5000/api/employees/${editingEmployee._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        name: editingEmployee.name,
                        email: editingEmployee.email
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || 'Failed to update employee'
                );
            }

            setEditingEmployee(null);
            setEmployeeMessage('Employee updated successfully!');

            await fetchEmployees();
        } catch (error) {
            setEmployeeMessage(
                error.message || 'Unable to update employee'
            );
        }
    };

    // Delete employee
    const handleDeleteEmployee = async (employee) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${employee.name}?`
        );

        if (!confirmed) {
            return;
        }

        setEmployeeMessage('');
        setEmployeesLoading(true);

        try {
            const response = await fetch(
                `http://localhost:5000/api/employees/${employee._id}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || 'Failed to delete employee'
                );
            }

            setEmployeeMessage('Employee deleted successfully!');

            await fetchEmployees();
        } catch (error) {
            setEmployeeMessage(
                error.message || 'Unable to delete employee'
            );
        } finally {
            setEmployeesLoading(false);
        }
    };

    // Fetch attendance
    const fetchAttendance = async () => {
        try {
            const response = await fetch(
                'http://localhost:5000/api/attendance',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || 'Failed to fetch attendance'
                );
            }

            setAttendance(data.attendance);
        } catch (error) {
            setAttendanceMessage(
                error.message || 'Unable to fetch attendance records'
            );
        }
    };

    // Mark attendance
    const handleMarkAttendance = async (status) => {
        setAttendanceMessage('');

        try {
            const response = await fetch(
                'http://localhost:5000/api/attendance/mark',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ status })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || 'Failed to mark attendance'
                );
            }

            setAttendanceMessage(data.message);
            await fetchAttendance();
        } catch (error) {
            setAttendanceMessage(
                error.message || 'Unable to connect to the server'
            );
        }
    };

    // Fetch leave applications
    const fetchLeaves = async () => {
        setLeaveMessage('');

        try {
            const response = await fetch(
                'http://localhost:5000/api/leaves',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to load leave applications');
            }

            setLeaves(data);
        } catch (error) {
            setLeaveMessage(error.message || 'Unable to load leave applications');
        }
    };

    // Employee applies for leave
    const handleApplyLeave = async (e) => {
        e.preventDefault();
        setLeaveMessage('');
        setLeaveLoading(true);

        try {
            const response = await fetch(
                'http://localhost:5000/api/leaves',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        leaveType,
                        startDate: leaveStartDate,
                        endDate: leaveEndDate,
                        reason: leaveReason
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to apply for leave');
            }

            setLeaveMessage('Leave application submitted successfully!');
            setLeaveStartDate('');
            setLeaveEndDate('');
            setLeaveReason('');
            await fetchLeaves();
        } catch (error) {
            setLeaveMessage(error.message || 'Unable to submit leave application');
        } finally {
            setLeaveLoading(false);
        }
    };

    // HR approves or rejects leave
    const handleLeaveStatus = async (leaveId, status) => {
        setLeaveMessage('');

        try {
            const response = await fetch(
                `http://localhost:5000/api/leaves/${leaveId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ status })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `Failed to ${status.toLowerCase()} leave`);
            }

            setLeaveMessage(`Leave ${status.toLowerCase()} successfully.`);
            await fetchLeaves();
        } catch (error) {
            setLeaveMessage(error.message || 'Unable to update leave status');
        }
    };

    // Fetch announcements
    const fetchAnnouncements = async () => {
        setAnnouncementMessage('');

        try {
            const response = await fetch(
                'http://localhost:5000/api/announcements',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to load announcements');
            }

            setAnnouncements(data);
        } catch (error) {
            setAnnouncementMessage(
                error.message || 'Unable to load announcements'
            );
        }
    };

    // HR publishes an announcement
    const handleCreateAnnouncement = async (e) => {
        e.preventDefault();
        setAnnouncementMessage('');
        setAnnouncementLoading(true);

        try {
            const response = await fetch(
                'http://localhost:5000/api/announcements',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        title: announcementTitle,
                        message: announcementText
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to publish announcement');
            }

            setAnnouncementTitle('');
            setAnnouncementText('');
            setAnnouncementMessage('Announcement published successfully!');
            await fetchAnnouncements();
        } catch (error) {
            setAnnouncementMessage(
                error.message || 'Unable to publish announcement'
            );
        } finally {
            setAnnouncementLoading(false);
        }
    };

    // HR deletes an announcement
    const handleDeleteAnnouncement = async (announcementId) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this announcement?'
        );

        if (!confirmed) {
            return;
        }

        setAnnouncementMessage('');

        try {
            const response = await fetch(
                `http://localhost:5000/api/announcements/${announcementId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to delete announcement');
            }

            setAnnouncementMessage('Announcement deleted successfully!');
            await fetchAnnouncements();
        } catch (error) {
            setAnnouncementMessage(
                error.message || 'Unable to delete announcement'
            );
        }
    };

    // Fetch training programs
    const fetchTrainings = async () => {
        setTrainingMessage('');
        setTrainingLoading(true);

        try {
            const response = await fetch(
                'http://localhost:5000/api/trainings',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to load training programs');
            }

            setTrainings(data);
        } catch (error) {
            setTrainingMessage(error.message || 'Unable to load training programs');
        } finally {
            setTrainingLoading(false);
        }
    };

    // HR or Manager creates a training program
    const handleCreateTraining = async (e) => {
        e.preventDefault();
        setTrainingMessage('');
        setTrainingLoading(true);

        try {
            const response = await fetch(
                'http://localhost:5000/api/trainings',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        title: trainingTitle,
                        description: trainingDescription,
                        trainer: trainingTrainer,
                        date: trainingDate
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create training program');
            }

            setTrainingTitle('');
            setTrainingDescription('');
            setTrainingTrainer('');
            setTrainingDate('');
            setTrainingMessage('Training program created successfully!');
            await fetchTrainings();
        } catch (error) {
            setTrainingMessage(error.message || 'Unable to create training program');
        } finally {
            setTrainingLoading(false);
        }
    };

    // HR or Manager deletes a training program
    const handleDeleteTraining = async (trainingId) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this training program?'
        );

        if (!confirmed) {
            return;
        }

        setTrainingMessage('');

        try {
            const response = await fetch(
                `http://localhost:5000/api/trainings/${trainingId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to delete training program');
            }

            setTrainingMessage('Training program deleted successfully!');
            await fetchTrainings();
        } catch (error) {
            setTrainingMessage(error.message || 'Unable to delete training program');
        }
    };

    // Change page
    const handlePageChange = (page) => {
        setActivePage(page);

        if (page === 'Employees' && user?.role === 'HR') {
            fetchEmployees();
        }

        if (page === 'Attendance') {
            setAttendance([]);
            setAttendanceMessage('');
            fetchAttendance();
        }

        if (page === 'Leave Management') {
            setLeaves([]);
            setLeaveMessage('');
            fetchLeaves();
        }

        if (page === 'Announcements') {
            setAnnouncements([]);
            setAnnouncementMessage('');
            fetchAnnouncements();
        }

        if (page === 'Training') {
            setTrainings([]);
            setTrainingMessage('');
            fetchTrainings();
        }
    };

    // Logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        setUser(null);
        setEmail('');
        setPassword('');
        setMessage('');
        setActivePage('Dashboard');
        setEmployees([]);
        setAttendance([]);
        setLeaves([]);
        setAnnouncements([]);
        setAnnouncementMessage('');
        setTrainings([]);
        setTrainingMessage('');
        setEditingEmployee(null);
    };

    if (user) {
        return (
            <div className="dashboard">
                <aside className="sidebar">
                    <div className="dashboard-brand">
                        <div className="brand-icon">S</div>
                        <h2>StaffSync</h2>
                    </div>

                    <p className="menu-title">MAIN MENU</p>

                    <div
                        className={`menu-item ${
                            activePage === 'Dashboard' ? 'active' : ''
                        }`}
                        onClick={() => handlePageChange('Dashboard')}
                    >
                        Dashboard
                    </div>

                    {user.role === 'HR' && (
                        <div
                            className={`menu-item ${
                                activePage === 'Employees' ? 'active' : ''
                            }`}
                            onClick={() => handlePageChange('Employees')}
                        >
                            Employees
                        </div>
                    )}

                    <div
                        className={`menu-item ${
                            activePage === 'Attendance' ? 'active' : ''
                        }`}
                        onClick={() => handlePageChange('Attendance')}
                    >
                        Attendance
                    </div>

                    <div
                        className={`menu-item ${
                            activePage === 'Leave Management' ? 'active' : ''
                        }`}
                        onClick={() => handlePageChange('Leave Management')}
                    >
                        Leave Management
                    </div>

                    <div
                        className={`menu-item ${
                            activePage === 'Announcements' ? 'active' : ''
                        }`}
                        onClick={() => handlePageChange('Announcements')}
                    >
                        Announcements
                    </div>

                    <div
                        className={`menu-item ${
                            activePage === 'Training' ? 'active' : ''
                        }`}
                        onClick={() => handlePageChange('Training')}
                    >
                        Training
                    </div>

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Sign Out
                    </button>
                </aside>

                <main className="dashboard-main">
                    <header className="dashboard-header">
                        <div>
                            <h1>{activePage}</h1>
                            <p>Welcome to your StaffSync workspace.</p>
                        </div>

                        <div className="user-info">
                            <div className="user-avatar">
                                {user.name.charAt(0).toUpperCase()}
                            </div>

                            <div>
                                <strong>{user.name}</strong>
                                <p>{user.role}</p>
                            </div>
                        </div>
                    </header>

                    {/* Dashboard */}
                    {activePage === 'Dashboard' ? (
                        <>
                            <section className="welcome-card">
                                <p>YOUR WORKSPACE</p>
                                <h2>Welcome back, {user.name}!</h2>
                                <p>
                                    Manage your work and stay connected
                                    with your organization.
                                </p>
                            </section>

                            <section className="dashboard-cards">
                                <div className="dashboard-card">
                                    <span className="card-icon">👥</span>
                                    <h3>Employees</h3>
                                    <p>
                                        View and manage employee information.
                                    </p>
                                </div>

                                <div className="dashboard-card">
                                    <span className="card-icon">📅</span>
                                    <h3>Attendance</h3>
                                    <p>
                                        Keep track of attendance records.
                                    </p>
                                </div>

                                <div className="dashboard-card">
                                    <span className="card-icon">📝</span>
                                    <h3>Leave Management</h3>
                                    <p>
                                        Manage leave applications and approvals.
                                    </p>
                                </div>

                                <div className="dashboard-card">
                                    <span className="card-icon">📢</span>
                                    <h3>Announcements</h3>
                                    <p>
                                        Stay updated with company announcements.
                                    </p>
                                </div>
                            </section>
                        </>
                    ) : activePage === 'Employees' && user.role === 'HR' ? (
                        /* Employee Management */
                        <section className="employee-section">
                            <div className="employee-heading">
                                <div>
                                    <h2>Employee Management</h2>
                                    <p>
                                        View and manage registered employees.
                                    </p>
                                </div>

                                <button
                                    className="add-employee-button"
                                    onClick={() => {
                                        setEmployeeMessage('');
                                        setEditingEmployee(null);
                                        setShowEmployeeForm(!showEmployeeForm);
                                    }}
                                >
                                    {showEmployeeForm
                                        ? 'Cancel'
                                        : '+ Add Employee'}
                                </button>
                            </div>

                            {showEmployeeForm && (
                                <form
                                    className="employee-form"
                                    onSubmit={handleAddEmployee}
                                >
                                    <h3>Add New Employee</h3>

                                    <label htmlFor="employeeName">
                                        Full Name
                                    </label>
                                    <input
                                        id="employeeName"
                                        type="text"
                                        placeholder="Enter employee name"
                                        value={employeeName}
                                        onChange={(e) =>
                                            setEmployeeName(e.target.value)
                                        }
                                        required
                                    />

                                    <label htmlFor="employeeEmail">
                                        Email Address
                                    </label>
                                    <input
                                        id="employeeEmail"
                                        type="email"
                                        placeholder="Enter employee email"
                                        value={employeeEmail}
                                        onChange={(e) =>
                                            setEmployeeEmail(e.target.value)
                                        }
                                        required
                                    />

                                    <label htmlFor="employeePassword">
                                        Password
                                    </label>
                                    <input
                                        id="employeePassword"
                                        type="password"
                                        placeholder="Create employee password"
                                        value={employeePassword}
                                        onChange={(e) =>
                                            setEmployeePassword(e.target.value)
                                        }
                                        minLength={8}
                                        required
                                    />

                                    <button
                                        type="submit"
                                        disabled={employeesLoading}
                                    >
                                        {employeesLoading
                                            ? 'Adding Employee...'
                                            : 'Save Employee'}
                                    </button>
                                </form>
                            )}

                            {editingEmployee && (
                                <form
                                    className="employee-form"
                                    onSubmit={handleUpdateEmployee}
                                >
                                    <h3>Edit Employee</h3>

                                    <label htmlFor="editEmployeeName">
                                        Full Name
                                    </label>
                                    <input
                                        id="editEmployeeName"
                                        type="text"
                                        value={editingEmployee.name}
                                        onChange={(e) =>
                                            setEditingEmployee({
                                                ...editingEmployee,
                                                name: e.target.value
                                            })
                                        }
                                        required
                                    />

                                    <label htmlFor="editEmployeeEmail">
                                        Email Address
                                    </label>
                                    <input
                                        id="editEmployeeEmail"
                                        type="email"
                                        value={editingEmployee.email}
                                        onChange={(e) =>
                                            setEditingEmployee({
                                                ...editingEmployee,
                                                email: e.target.value
                                            })
                                        }
                                        required
                                    />

                                    <button type="submit">
                                        Save Changes
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setEditingEmployee(null)
                                        }
                                    >
                                        Cancel
                                    </button>
                                </form>
                            )}

                            {employeeMessage && (
                                <p className="login-message">
                                    {employeeMessage}
                                </p>
                            )}

                            {employeesLoading ? (
                                <p>Loading employees...</p>
                            ) : (
                                <>
                                    <p className="employee-count">
                                        Total registered users: {employees.length}
                                    </p>

                                    <div className="employee-table-wrapper">
                                        <table className="employee-table">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Role</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {employees.map((employee) => (
                                                    <tr key={employee._id}>
                                                        <td>{employee.name}</td>
                                                        <td>{employee.email}</td>
                                                        <td>
                                                            <span className="role-badge">
                                                                {employee.role}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {employee.role === 'Employee' && (
                                                                <>
                                                                    <button
                                                                        type="button"
                                                                        className="edit-employee-button"
                                                                        onClick={() => {
                                                                            setShowEmployeeForm(false);
                                                                            setEmployeeMessage('');
                                                                            setEditingEmployee({
                                                                                _id: employee._id,
                                                                                name: employee.name,
                                                                                email: employee.email
                                                                            });
                                                                        }}
                                                                    >
                                                                        Edit
                                                                    </button>

                                                                    <button
                                                                        type="button"
                                                                        className="delete-employee-button"
                                                                        onClick={() =>
                                                                            handleDeleteEmployee(employee)
                                                                        }
                                                                        disabled={employeesLoading}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            )}
                        </section>
                    ) : activePage === 'Attendance' ? (
                        /* Attendance Management */
                        <section className="employee-section">
                            <div className="employee-heading">
                                <div>
                                    <h2>Attendance Management</h2>
                                    <p>
                                        Mark attendance and view attendance history.
                                    </p>
                                </div>
                            </div>

                            <div className="attendance-actions">
                                <button
                                    type="button"
                                    className="add-employee-button"
                                    onClick={() =>
                                        handleMarkAttendance('Present')
                                    }
                                >
                                    Mark Present
                                </button>

                                <button
                                    type="button"
                                    className="delete-employee-button"
                                    onClick={() =>
                                        handleMarkAttendance('Absent')
                                    }
                                >
                                    Mark Absent
                                </button>
                            </div>

                            {attendanceMessage && (
                                <p className="login-message">
                                    {attendanceMessage}
                                </p>
                            )}

                            <h3>Attendance History</h3>

                            <div className="employee-table-wrapper">
                                <table className="employee-table">
                                    <thead>
                                        <tr>
                                            {user.role === 'HR' && (
                                                <th>Employee</th>
                                            )}
                                            <th>Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {attendance.length > 0 ? (
                                            attendance.map((record) => (
                                                <tr key={record._id}>
                                                    {user.role === 'HR' && (
                                                        <td>
                                                            {record.employee?.name ||
                                                                'Unknown'}
                                                        </td>
                                                    )}
                                                    <td>{record.date}</td>
                                                    <td>
                                                        <span className="role-badge">
                                                            {record.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={
                                                        user.role === 'HR' ? 3 : 2
                                                    }
                                                >
                                                    No attendance records found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    ) : activePage === 'Leave Management' ? (
                        <section className="employee-section">
                            <div className="employee-heading">
                                <div>
                                    <h2>Leave Management</h2>
                                    <p>
                                        {user.role === 'HR'
                                            ? 'Review and manage employee leave applications.'
                                            : 'Apply for leave and track your application status.'}
                                    </p>
                                </div>
                            </div>

                            {user.role !== 'HR' && (
                                <form className="employee-form" onSubmit={handleApplyLeave}>
                                    <h3>Apply for Leave</h3>

                                    <label htmlFor="leaveType">Leave Type</label>
                                    <select
                                        id="leaveType"
                                        value={leaveType}
                                        onChange={(e) => setLeaveType(e.target.value)}
                                        required
                                    >
                                        <option value="Casual">Casual</option>
                                        <option value="Sick">Sick</option>
                                        <option value="Annual">Annual</option>
                                        <option value="Other">Other</option>
                                    </select>

                                    <label htmlFor="leaveStartDate">Start Date</label>
                                    <input
                                        id="leaveStartDate"
                                        type="date"
                                        value={leaveStartDate}
                                        onChange={(e) => setLeaveStartDate(e.target.value)}
                                        required
                                    />

                                    <label htmlFor="leaveEndDate">End Date</label>
                                    <input
                                        id="leaveEndDate"
                                        type="date"
                                        value={leaveEndDate}
                                        min={leaveStartDate || undefined}
                                        onChange={(e) => setLeaveEndDate(e.target.value)}
                                        required
                                    />

                                    <label htmlFor="leaveReason">Reason</label>
                                    <textarea
                                        id="leaveReason"
                                        value={leaveReason}
                                        onChange={(e) => setLeaveReason(e.target.value)}
                                        placeholder="Enter reason for leave"
                                        rows="3"
                                        required
                                    />

                                    <button type="submit" disabled={leaveLoading}>
                                        {leaveLoading ? 'Submitting...' : 'Submit Leave Application'}
                                    </button>
                                </form>
                            )}

                            {leaveMessage && (
                                <p className="login-message">{leaveMessage}</p>
                            )}

                            <h3>{user.role === 'HR' ? 'All Leave Applications' : 'My Leave Applications'}</h3>

                            <div className="employee-table-wrapper">
                                <table className="employee-table">
                                    <thead>
                                        <tr>
                                            {user.role === 'HR' && <th>Employee</th>}
                                            <th>Type</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Reason</th>
                                            <th>Status</th>
                                            {user.role === 'HR' && <th>Action</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leaves.length > 0 ? (
                                            leaves.map((leave) => (
                                                <tr key={leave._id}>
                                                    {user.role === 'HR' && (
                                                        <td>{leave.employee?.name || 'Unknown'}</td>
                                                    )}
                                                    <td>{leave.leaveType}</td>
                                                    <td>{leave.startDate}</td>
                                                    <td>{leave.endDate}</td>
                                                    <td>{leave.reason}</td>
                                                    <td>
                                                        <span className="role-badge">{leave.status}</span>
                                                    </td>
                                                    {user.role === 'HR' && (
                                                        <td>
                                                            {leave.status === 'Pending' ? (
                                                                <>
                                                                    <button
                                                                        type="button"
                                                                        className="edit-employee-button"
                                                                        onClick={() => handleLeaveStatus(leave._id, 'Approved')}
                                                                    >
                                                                        Approve
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="delete-employee-button"
                                                                        onClick={() => handleLeaveStatus(leave._id, 'Rejected')}
                                                                    >
                                                                        Reject
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                '—'
                                                            )}
                                                        </td>
                                                    )}
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={user.role === 'HR' ? 7 : 5}>
                                                    No leave applications found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    ) : activePage === 'Announcements' ? (
                        <section className="employee-section">
                            <div className="employee-heading">
                                <div>
                                    <h2>Company Announcements</h2>
                                    <p>
                                        {user.role === 'HR'
                                            ? 'Publish important updates for your organization.'
                                            : 'View the latest updates from your organization.'}
                                    </p>
                                </div>
                            </div>

                            {user.role === 'HR' && (
                                <form
                                    className="employee-form"
                                    onSubmit={handleCreateAnnouncement}
                                >
                                    <h3>Publish Announcement</h3>

                                    <label htmlFor="announcementTitle">Title</label>
                                    <input
                                        id="announcementTitle"
                                        type="text"
                                        placeholder="Enter announcement title"
                                        value={announcementTitle}
                                        onChange={(e) => setAnnouncementTitle(e.target.value)}
                                        required
                                    />

                                    <label htmlFor="announcementText">Message</label>
                                    <textarea
                                        id="announcementText"
                                        placeholder="Write your announcement"
                                        value={announcementText}
                                        onChange={(e) => setAnnouncementText(e.target.value)}
                                        rows="4"
                                        required
                                    />

                                    <button type="submit" disabled={announcementLoading}>
                                        {announcementLoading ? 'Publishing...' : 'Publish Announcement'}
                                    </button>
                                </form>
                            )}

                            {announcementMessage && (
                                <p className="login-message">{announcementMessage}</p>
                            )}

                            <h3>Latest Announcements</h3>

                            {announcements.length > 0 ? (
                                <div className="announcement-list">
                                    {announcements.map((announcement) => (
                                        <article
                                            className="announcement-card"
                                            key={announcement._id}
                                        >
                                            <div className="employee-heading">
                                                <div>
                                                    <h3>{announcement.title}</h3>
                                                    <p>
                                                        Published by {announcement.createdBy?.name || 'HR'}
                                                        {' · '}
                                                        {announcement.createdAt
                                                            ? new Date(announcement.createdAt).toLocaleString()
                                                            : ''}
                                                    </p>
                                                </div>

                                                {user.role === 'HR' && (
                                                    <button
                                                        type="button"
                                                        className="delete-employee-button"
                                                        onClick={() => handleDeleteAnnouncement(announcement._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                            <p>{announcement.message}</p>
                                        </article>
                                    ))}
                                </div>
                            ) : (
                                <p>No announcements available.</p>
                            )}
                        </section>
                    ) : activePage === 'Training' ? (
                        <section className="employee-section">
                            <div className="employee-heading">
                                <div>
                                    <h2>Training &amp; Development</h2>
                                    <p>
                                        {user.role === 'HR' || user.role === 'Manager'
                                            ? 'Create training programs and help your team develop new skills.'
                                            : 'View available training programs and development opportunities.'}
                                    </p>
                                </div>
                            </div>

                            {(user.role === 'HR' || user.role === 'Manager') && (
                                <form className="employee-form" onSubmit={handleCreateTraining}>
                                    <h3>Create Training Program</h3>

                                    <label htmlFor="trainingTitle">Training Title</label>
                                    <input
                                        id="trainingTitle"
                                        type="text"
                                        placeholder="Enter training title"
                                        value={trainingTitle}
                                        onChange={(e) => setTrainingTitle(e.target.value)}
                                        required
                                    />

                                    <label htmlFor="trainingDescription">Description</label>
                                    <textarea
                                        id="trainingDescription"
                                        placeholder="Describe the training program"
                                        value={trainingDescription}
                                        onChange={(e) => setTrainingDescription(e.target.value)}
                                        rows="3"
                                        required
                                    />

                                    <label htmlFor="trainingTrainer">Trainer</label>
                                    <input
                                        id="trainingTrainer"
                                        type="text"
                                        placeholder="Enter trainer name"
                                        value={trainingTrainer}
                                        onChange={(e) => setTrainingTrainer(e.target.value)}
                                        required
                                    />

                                    <label htmlFor="trainingDate">Training Date</label>
                                    <input
                                        id="trainingDate"
                                        type="date"
                                        value={trainingDate}
                                        onChange={(e) => setTrainingDate(e.target.value)}
                                        required
                                    />

                                    <button type="submit" disabled={trainingLoading}>
                                        {trainingLoading ? 'Saving...' : 'Create Training Program'}
                                    </button>
                                </form>
                            )}

                            {trainingMessage && (
                                <p className="login-message">{trainingMessage}</p>
                            )}

                            <h3>Available Training Programs</h3>

                            {trainingLoading && trainings.length === 0 ? (
                                <p>Loading training programs...</p>
                            ) : trainings.length > 0 ? (
                                <div className="announcement-list">
                                    {trainings.map((training) => (
                                        <article className="announcement-card" key={training._id}>
                                            <div className="employee-heading">
                                                <div>
                                                    <h3>{training.title}</h3>
                                                    <p>
                                                        Trainer: {training.trainer} {' · '}
                                                        Date: {training.date}
                                                    </p>
                                                    <p>
                                                        Created by {training.createdBy?.name || 'StaffSync'}
                                                    </p>
                                                </div>

                                                {(user.role === 'HR' || user.role === 'Manager') && (
                                                    <button
                                                        type="button"
                                                        className="delete-employee-button"
                                                        onClick={() => handleDeleteTraining(training._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                            <p>{training.description}</p>
                                        </article>
                                    ))}
                                </div>
                            ) : (
                                <p>No training programs available.</p>
                            )}
                        </section>
                    ) : (
                        /* Other sections */
                        <section className="employee-section">
                            <h2>{activePage}</h2>
                            <p>
                                This section will be implemented in a later step.
                            </p>
                        </section>
                    )}
                </main>
            </div>
        );
    }

    // Login page
    return (
        <div className="login-page">
            <div className="login-card">
                <div className="brand">
                    <div className="brand-icon">S</div>
                    <h1>StaffSync</h1>
                </div>

                <h2>Welcome back</h2>
                <p className="subtitle">
                    Sign in to access your workspace
                </p>

                <form onSubmit={handleLogin}>
                    <label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>

                    {message && (
                        <p className="login-message">{message}</p>
                    )}
                </form>

                <p className="footer-text">
                    Staff management made simple.
                </p>
            </div>
        </div>
    );
}

export default App;