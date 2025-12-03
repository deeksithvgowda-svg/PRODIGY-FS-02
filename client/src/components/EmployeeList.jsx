import React, { useState, useEffect, useCallback } from 'react';
import api from '../api'; 

const EmployeeList = ({ onEditStart }) => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredButtonId, setHoveredButtonId] = useState(null); 

    const fetchEmployees = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.get('/employees'); 
            setEmployees(res.data);
        } catch (err) {
            console.error('Failed to fetch employees:', err);
            setError('Failed to load employee records. Check network or server status.');
            setEmployees([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]); 

    const handleDelete = async (employeeId) => {
        if (window.confirm('Are you sure you want to permanently delete this employee record?')) {
            try {
                await api.delete(`/employees/${employeeId}`); 
                setEmployees(employees.filter(emp => emp._id !== employeeId));
            } catch (err) {
                console.error('Deletion failed:', err);
                alert(err.response?.data?.msg || 'Failed to delete record. Check admin permissions.');
            }
        }
    };
    
    const handleEdit = (employee) => {
        if (onEditStart) {
            onEditStart(employee); 
        }
    };
    
    const getButtonStyle = (baseStyle, hoverStyle, buttonType, employeeId) => {
        const uniqueId = `${buttonType}_${employeeId}`;
        const isHovered = hoveredButtonId === uniqueId;

        return isHovered 
            ? { ...baseStyle, ...hoverStyle }
            : baseStyle;
    };
    
    // --- RENDERING LOGIC ---
    
    if (loading) {
        return <h2 style={listStyles.title}>Loading Employee Records...</h2>;
    }

    if (error) {
        return <p style={{...listStyles.error, textAlign: 'center'}}>{error}</p>;
    }

    if (employees.length === 0) {
        return (
            <div>
                <h2 style={listStyles.title}>Employee Records</h2>
                <p style={listStyles.noRecords}>No employee records found. Use the "+ Add Employee" button to start.</p>
            </div>
        );
    }
    
    return (
        <div>
            <h2 style={listStyles.title}>Employee Records</h2> 
            <div style={listStyles.tableWrapper}>
                <table style={listStyles.table}>
                    <thead>
                        <tr>
                            <th style={listStyles.th}>Name</th>
                            <th style={listStyles.th}>Email</th>
                            <th style={listStyles.th}>Job Title</th>
                            <th style={listStyles.th}>Department</th>
                            <th style={listStyles.th}>Salary (₹)</th> 
                            <th style={listStyles.th}>Actions</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee._id || employee.id} style={listStyles.tr}> 
                                <td style={listStyles.td}>{employee.first_name} {employee.last_name}</td>
                                <td style={listStyles.td}>{employee.email}</td>
                                <td style={listStyles.td}>{employee.job_title}</td>
                                <td style={listStyles.td}>{employee.department}</td>
                                <td style={listStyles.td}>₹{(employee.salary || 0).toLocaleString('en-IN')}</td> 
                                
                                {/* ACTION BUTTONS WITH HOVER LOGIC */}
                                <td style={listStyles.td}>
                                    <button 
                                        onClick={() => handleEdit(employee)} 
                                        onMouseEnter={() => setHoveredButtonId(`edit_${employee._id}`)}
                                        onMouseLeave={() => setHoveredButtonId(null)}
                                        style={getButtonStyle(
                                            listStyles.baseButton, 
                                            listStyles.editButtonHover, // NOW PURPLE GLOW
                                            'edit', 
                                            employee._id
                                        )}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(employee._id)} 
                                        onMouseEnter={() => setHoveredButtonId(`delete_${employee._id}`)}
                                        onMouseLeave={() => setHoveredButtonId(null)}
                                        style={getButtonStyle(
                                            listStyles.baseButton, 
                                            listStyles.deleteButtonHover, // REMAINS RED GLOW
                                            'delete', 
                                            employee._id
                                        )}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- UPDATED STYLES ---

const listStyles = {
    title: { 
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#ffffff', 
    },
    noRecords: { 
        fontSize: '1.2rem',
        color: '#ecf0f1',
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#2c3e50',
        borderRadius: '5px',
    },
    error: {
        fontSize: '1.2rem',
        color: '#e74c3c',
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#3e2e2e',
        borderRadius: '5px',
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#2c3e50',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    },
    th: {
        padding: '15px',
        textAlign: 'left',
        backgroundColor: '#34495e',
        color: 'white',
        fontWeight: '600',
    },
    tr: {
        borderBottom: '1px solid #455a64', 
        transition: 'background-color 0.2s',
    },
    td: { 
        padding: '15px',
        color: '#ecf0f1', 
    },
    
    // 1. BASE BUTTON STYLE (Default White)
    baseButton: {
        backgroundColor: '#ffffff',
        color: '#2c3e50',
        border: '1px solid #ffffff',
        padding: '6px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '8px',
        fontWeight: 'bold',
        transition: 'all 0.2s ease-in-out', 
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    
    // 2. UPDATED: EDIT BUTTON HOVER (Bright Purple Glow)
    editButtonHover: {
        backgroundColor: '#a855f7', // Bright Purple
        color: 'white', 
        border: '1px solid #a855f7',
        boxShadow: '0 0 10px #a855f7', // Purple Glow
    },
    
    // 3. DELETE BUTTON HOVER (Red Glow) - No change
    deleteButtonHover: {
        backgroundColor: '#e74c3c',
        color: 'white',
        border: '1px solid #e74c3c',
        boxShadow: '0 0 10px #e74c3c', // Red Glow
    }
};

export default EmployeeList;
