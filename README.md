# StaffSync — HR Management System

A full-stack Human Resource Management System designed to simplify employee management, attendance tracking, leave management, company announcements, and employee training.

StaffSync provides role-based access for HR personnel, managers, and employees through a React-based user interface and a Node.js and Express backend connected to MongoDB.

## Project Overview

Managing employee information and routine HR activities manually can be time-consuming. StaffSync aims to bring these activities together in one application, making HR operations easier to organize and access.

The system supports three user roles: HR, Manager, and Employee. Each role has access to features according to its responsibilities.

## Key Features

### 1. Authentication and Role-Based Access

* User authentication using JSON Web Tokens (JWT).
* Password hashing using bcryptjs.
* Role-based authorization for protected operations.
* Separate access permissions for HR, Managers, and Employees.

### 2. Employee Management

* View employee records.
* Add new employee accounts.
* Update employee information.
* Delete employee records.
* Restrict employee management operations to HR.

### 3. Attendance Management

* Mark daily attendance.
* Record Present and Absent statuses.
* View attendance records according to user permissions.
* Prevent duplicate attendance records for the same employee and date.

### 4. Leave Management

* Submit leave applications.
* Select a leave type and enter leave dates and a reason.
* View leave application records.
* Allow HR to approve or reject leave requests.
* Track Pending, Approved, and Rejected statuses.

### 5. Announcements

* Publish company announcements.
* View announcements through the application.
* Allow HR to manage published announcements.

### 6. Training and Development

* Create training sessions with descriptions, trainers, and dates.
* View available training sessions.
* Allow HR and Managers to manage training records.

## User Roles

| Feature                  | HR                            | Manager                                   | Employee         |
| ------------------------ | ----------------------------- | ----------------------------------------- | ---------------- |
| Manage employee records  | Yes                           | No                                        | No               |
| Mark and view attendance | Yes                           | Yes                                       | Yes              |
| Apply for leave          | Yes, through the leave module | Yes                                       | Yes              |
| View leave applications  | All applications              | Own applications in the current interface | Own applications |
| Approve or reject leave  | Yes                           | No                                        | No               |
| Manage announcements     | Yes                           | No                                        | No               |
| View announcements       | Yes                           | Yes                                       | Yes              |
| Manage training sessions | Yes                           | Yes                                       | No               |
| View training sessions   | Yes                           | Yes                                       | Yes              |


## Technology Stack

**Frontend**

* React
* Vite
* HTML
* CSS
* JavaScript

**Backend**

* Node.js
* Express.js
* REST API architecture

**Database**

* MongoDB
* Mongoose

**Authentication and Security**

* JSON Web Tokens (JWT)
* bcryptjs
* Role-based authorization
* Environment variables for configuration

**Development and Testing**

* Visual Studio Code
* MongoDB Compass
* Postman

## Getting Started

### Prerequisites

Install the following software:

* Node.js and npm
* MongoDB, running locally or hosted in the cloud
* A web browser

### 1. Clone the Repository

```bash
git clone https://github.com/deepshikha-jhala/StaffSync-HR-Management-System.git
cd StaffSync-HR-Management-System
```

### 2. Configure the Backend

```bash
cd backend
npm install
```

Use your own secure JWT secret. 

### 3. Start the Backend

Run this command from the `backend` folder:

```bash
npm start
```

If your `package.json` does not define a start script, use the appropriate command configured for your project, such as:

```bash
node server.js
```

### 4. Configure the Frontend

Open a second terminal and navigate to the frontend folder:

```bash
cd frontend
npm install
```

### 5. Start the Frontend

```bash
npm run dev
```

Open the local address printed by Vite in your terminal.

**Note:** The backend and frontend must be configured to communicate with each other. The MongoDB connection must also be available. Follow the actual scripts and configuration in the repository if they differ from these examples.

## Testing

The application has been tested during development for major workflows, including:

* Employee creation, updating, and deletion by HR.
* Attendance marking and retrieval.
* Leave application and HR approval or rejection.
* Announcement creation and viewing.
* Training session creation and management.
* Role-based access restrictions.
* Validation of invalid leave date ranges.

Further end-to-end testing and deployment verification are part of the finalization process.

## Project Demo Video

**Demo Video:** Click on the link to watch the demo.
[To be added](https://drive.google.com/file/d/1f99m0YjKnrOvgrCcWryxBu4lf5vNrqBl/view?usp=sharing) .

##  Live Demo

**Try StaffSync here:** [Open StaffSync Live Demo]([PASTE_YOUR_VERCEL_URL_HERE](https://staffsync-two.vercel.app/))

The application is deployed using Vercel for the frontend, Render for the backend, and MongoDB Atlas for cloud database storage.

###  Demo Login Credentials

Use the following credentials to explore the HR dashboard:

| Field    | Details                |
| -------- | ---------------------- |
| Role     | HR                     |
| Email    | `demohr@staffsync.com` |
| Password | `Demo@12345`           |

**Instructions:**

1. Open the live demo link above.
2. Enter the demo credentials.
3. Click **Sign In** to access the HR dashboard.
4. Explore the available features of StaffSync.

> **Note:** These credentials are provided exclusively for academic project evaluation. Please do not use the demo account for personal.


## Future Improvements

* Implement manager access to team leave applications.
* Improve validation and error handling across all forms.
* Add reporting and analytics dashboards.
* Introduce email notifications for leave decisions and announcements.
* Improve automated testing and production security.
* Deploy the application with a cloud database and hosted frontend and backend.


## Author

Developed as a full-stack HR Management System project using the MERN technology stack.
