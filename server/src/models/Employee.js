// server/src/models/Employee.js

const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    // Employee Personal Details
    first_name: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    last_name: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true, // Ensures no two employees have the same email
        match: [/.+@.+\..+/, 'Please enter a valid email address'] 
    },

    // Employee Job Details
    job_title: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true
    },
    department: {
        type: String,
        required: [true, 'Department is required']
    },
    salary: {
        type: Number,
        required: [true, 'Salary is required'],
        min: [0, 'Salary cannot be negative']
    },
    hire_date: {
        type: Date,
        default: Date.now 
    },
    
    // Status
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Leave'],
        default: 'Active'
    },

    // Reference to the Admin who created the record (optional, for tracking)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Employee', EmployeeSchema);
