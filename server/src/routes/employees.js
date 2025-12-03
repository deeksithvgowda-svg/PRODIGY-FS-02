// server/src/routes/employees.js

const express = require('express');
const router = express.Router();

// Import the authentication middleware
const auth = require('../middleware/auth'); 

// Import the controller (we'll create this file next)
const employeeController = require('../controllers/employeeController');

// --- ALL ROUTES BELOW REQUIRE A VALID JWT TOKEN (Admin access) ---

// @route   POST /api/employees
// @desc    Add a new employee record
// @access  Private (Admin only)
router.post('/', auth, employeeController.createEmployee);

// @route   GET /api/employees
// @desc    Get all employee records
// @access  Private (Admin only)
router.get('/', auth, employeeController.getEmployees);

// @route   GET /api/employees/:id
// @desc    Get a specific employee record by ID
// @access  Private (Admin only)
router.get('/:id', auth, employeeController.getEmployeeById);

// @route   PUT /api/employees/:id
// @desc    Update an employee record
// @access  Private (Admin only)
router.put('/:id', auth, employeeController.updateEmployee);

// @route   DELETE /api/employees/:id
// @desc    Delete an employee record
// @access  Private (Admin only)
router.delete('/:id', auth, employeeController.deleteEmployee);


module.exports = router;
