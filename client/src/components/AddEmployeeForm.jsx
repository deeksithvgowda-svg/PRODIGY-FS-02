// client/src/components/AddEmployeeForm.jsx

import React, { useState } from 'react';
import api from '../api';

const AddEmployeeForm = ({ onEmployeeAdded, onCancel }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        job_title: '',
        department: '',
        salary: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [hoveredButton, setHoveredButton] = useState(null); 

    const { first_name, last_name, email, job_title, department, salary } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!first_name || !last_name || !email || !job_title || !department || !salary) {
            setError('All fields are required.');
            return;
        }

        try {
            await api.post('/employees', formData);
            setSuccess('Employee added successfully!');
            
            setFormData({
                first_name: '', last_name: '', email: '', job_title: '', department: '', salary: ''
            });

            setTimeout(onEmployeeAdded, 1000); 

        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to add employee. Check data format.');
        }
    };
    
    const getButtonStyle = (baseStyle, hoverStyle, buttonType) => {
        const isHovered = hoveredButton === buttonType;
        return isHovered ? { ...baseStyle, ...hoverStyle } : baseStyle;
    };

    return (
        <div style={formStyles.contentCard}>
            <h2 style={formStyles.title}>Add New Employee</h2>
            
            {error && <p style={formStyles.error}>{error}</p>}
            {success && <p style={formStyles.success}>{success}</p>}

            <form onSubmit={onSubmit} style={formStyles.form}>
                
                {/* FIRST NAME */}
                <div style={formStyles.formGroup}>
                    <label htmlFor="first_name" style={formStyles.label}>First Name</label>
                    <input 
                        type="text" 
                        name="first_name" 
                        value={first_name} 
                        onChange={onChange} 
                        style={formStyles.input}
                        required 
                    />
                </div>

                {/* LAST NAME */}
                <div style={formStyles.formGroup}>
                    <label htmlFor="last_name" style={formStyles.label}>Last Name</label>
                    <input 
                        type="text" 
                        name="last_name" 
                        value={last_name} 
                        onChange={onChange} 
                        style={formStyles.input}
                        required 
                    />
                </div>

                {/* EMAIL */}
                <div style={formStyles.formGroup}>
                    <label htmlFor="email" style={formStyles.label}>Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={email} 
                        onChange={onChange} 
                        style={formStyles.input}
                        required 
                    />
                </div>

                {/* JOB TITLE */}
                <div style={formStyles.formGroup}>
                    <label htmlFor="job_title" style={formStyles.label}>Job Title</label>
                    <input 
                        type="text" 
                        name="job_title" 
                        value={job_title} 
                        onChange={onChange} 
                        style={formStyles.input}
                        required 
                    />
                </div>

                {/* DEPARTMENT */}
                <div style={formStyles.formGroup}>
                    <label htmlFor="department" style={formStyles.label}>Department</label>
                    <input 
                        type="text" 
                        name="department" 
                        value={department} 
                        onChange={onChange} 
                        style={formStyles.input}
                        required 
                    />
                </div>

                {/* SALARY */}
                <div style={formStyles.formGroup}>
                    <label htmlFor="salary" style={formStyles.label}>Salary (₹)</label>
                    <input 
                        type="number" 
                        name="salary" 
                        value={salary} 
                        onChange={onChange} 
                        style={formStyles.input}
                        required 
                        min="1"
                    />
                </div>

                {/* BUTTONS */}
                <div style={formStyles.buttonGroup}>
                    <button 
                        type="button" 
                        onClick={onCancel} 
                        onMouseEnter={() => setHoveredButton('cancel')}
                        onMouseLeave={() => setHoveredButton(null)}
                        style={getButtonStyle(
                            formStyles.baseButton, 
                            formStyles.cancelButtonHover, 
                            'cancel'
                        )}
                    >
                        CANCEL
                    </button>
                    
                    <button 
                        type="submit" 
                        onMouseEnter={() => setHoveredButton('submit')}
                        onMouseLeave={() => setHoveredButton(null)}
                        style={getButtonStyle(
                            formStyles.baseButton, 
                            formStyles.submitButtonHover, 
                            'submit'
                        )}
                    >
                        ADD EMPLOYEE
                    </button>
                </div>
            </form>
        </div>
    );
};

// --- UPDATED STYLES FOR LESS GAP ---
const formStyles = {
    // Note: The main card background is defined in EmployeeDashboard.jsx (contentCard: #2c3e50)
    contentCard: {}, 
    title: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        marginBottom: '30px',
        color: '#ffffff', 
        borderBottom: '1px solid #34495e',
        paddingBottom: '15px',
    },
    form: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '12px', // REDUCED GAP (from 20px)
    },
    formGroup: {
        marginBottom: '5px', // REDUCED MARGIN (from 10px)
    },
    label: {
        display: 'block',
        marginBottom: '5px', // REDUCED MARGIN (from 8px)
        fontWeight: '600',
        fontSize: '0.95rem',
        color: '#bdc3c7',
    },
    input: {
        width: '100%',
        padding: '12px 15px',
        border: '1px solid #455a64',
        borderRadius: '6px',
        backgroundColor: '#34495e',
        color: '#ecf0f1',
        fontSize: '1rem',
        boxSizing: 'border-box',
    },
    error: {
        color: '#e74c3c',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: '20px',
        padding: '12px',
        backgroundColor: '#3e2e2e',
        border: '1px solid #721c24',
        borderRadius: '6px'
    },
    success: {
        color: '#27ae60',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: '20px',
        padding: '12px',
        backgroundColor: '#2e3e34',
        border: '1px solid #1e5a32',
        borderRadius: '6px'
    },
    buttonGroup: {
        marginTop: '30px',
        display: 'flex',
        justifyContent: 'flex-start',
        gap: '20px',
    },
    baseButton: {
        padding: '10px 20px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'all 0.2s ease-in-out',
        minWidth: '120px',
        backgroundColor: '#ffffff',
        color: '#2c3e50',
        border: '1px solid #ffffff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    cancelButtonHover: {
        backgroundColor: '#bdc3c7',
        color: '#2c3e50',
    },
    submitButtonHover: {
        backgroundColor: '#a855f7',
        color: 'white',
        border: '1px solid #a855f7',
        boxShadow: '0 0 10px #a855f7',
    }
};

export default AddEmployeeForm;
