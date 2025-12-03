// server/src/controllers/employeeController.js

const Employee = require('../models/Employee');

// @desc    Add a new employee record
// @route   POST /api/employees
// @access  Private (Admin only)
exports.createEmployee = async (req, res) => {
    try {
        // Create the new employee document using the request body data
        const newEmployee = new Employee({
            // req.body contains all employee fields (first_name, last_name, etc.)
            ...req.body,
            // The user ID is attached to the request object by the 'auth' middleware
            user: req.user.id 
        });

        const employee = await newEmployee.save();

        res.json(employee);
    } catch (err) {
        console.error(err.message);
        // Handle validation errors (e.g., missing required field)
        if (err.name === 'ValidationError') {
            return res.status(400).json({ msg: err.message });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Get all employee records
// @route   GET /api/employees
// @access  Private (Admin only)
exports.getEmployees = async (req, res) => {
    try {
        // Fetch all employees, sorting by the newest first
        const employees = await Employee.find().sort({ hire_date: -1 });
        res.json(employees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get a specific employee record by ID
// @route   GET /api/employees/:id
// @access  Private (Admin only)
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({ msg: 'Employee not found' });
        }
        res.json(employee);
    } catch (err) {
        console.error(err.message);
        // Check for invalid ID format
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Employee not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Update an employee record
// @route   PUT /api/employees/:id
// @access  Private (Admin only)
exports.updateEmployee = async (req, res) => {
    try {
        let employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({ msg: 'Employee not found' });
        }

        // Find the employee by ID and update, returning the new document
        employee = await Employee.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } // { new: true } returns the updated document
        );

        res.json(employee);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Employee not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Delete an employee record
// @route   DELETE /api/employees/:id
// @access  Private (Admin only)
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({ msg: 'Employee not found' });
        }

        await Employee.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Employee removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Employee not found' });
        }
        res.status(500).send('Server Error');
    }
};
