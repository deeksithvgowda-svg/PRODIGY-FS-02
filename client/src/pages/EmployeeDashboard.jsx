import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeList from '../components/EmployeeList'; 
import AddEmployeeForm from '../components/AddEmployeeForm'; 
import EditEmployeeForm from '../components/EditEmployeeForm';

const EmployeeDashboard = () => {
    // State to manage the active content view ('list', 'add', 'edit')
    const [activeView, setActiveView] = useState('list'); 
    const [employeeToEdit, setEmployeeToEdit] = useState(null); 
    const [refreshListKey, setRefreshListKey] = useState(0); 
    // State to track the key of the hovered nav button
    const [hoveredNavButton, setHoveredNavButton] = useState(null); 

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user')) || { username: 'Admin' };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleEmployeeActionComplete = () => {
        setEmployeeToEdit(null); 
        setActiveView('list'); 
        setRefreshListKey(prev => prev + 1); 
    }
    
    const handleEditStart = (employee) => {
        setEmployeeToEdit(employee);
        setActiveView('edit');
    }
    
    // Function to get the style for a navigation button (Updated for PURPLE GLOW)
    const getNavButtonStyle = (viewName) => {
        const isHovered = hoveredNavButton === viewName;
        const isActive = activeView === viewName;
        
        let style = dashboardStyles.navButton;

        if (isActive) {
            // Apply the bright purple active style
            style = { ...style, ...dashboardStyles.purpleActiveStyle };
        } 
        
        // Apply the bright purple hover glow if hovered
        if (isHovered) {
             style = { 
                ...style, 
                ...dashboardStyles.purpleHoverGlow
            };
        }
        
        return style;
    };


    const renderContent = () => {
        switch (activeView) {
            case 'list':
                return <EmployeeList 
                    key={refreshListKey} 
                    onEditStart={handleEditStart} 
                />;
            case 'add':
                return <AddEmployeeForm 
                    onEmployeeAdded={handleEmployeeActionComplete} 
                    onCancel={() => setActiveView('list')} 
                />;
            case 'edit': 
                if (!employeeToEdit) {
                    return <div style={dashboardStyles.contentCard}>Error: No employee selected for editing.</div>;
                }
                return <EditEmployeeForm
                    employeeData={employeeToEdit}
                    onUpdateComplete={handleEmployeeActionComplete}
                    onCancel={() => setActiveView('list')}
                />
            // Removed 'settings' and 'reports'
            default:
                return <EmployeeList key={refreshListKey} onEditStart={handleEditStart} />;
        }
    };

    return (
        <div style={dashboardStyles.container}>
            {/* Sidebar */}
            <div style={dashboardStyles.sidebar}>
                <div style={dashboardStyles.logo}>Employee Portal</div>
                <nav style={dashboardStyles.nav}>
                    
                    {/* Employee List Button - PURPLE Glow/Active */}
                    <button 
                        onClick={() => setActiveView('list')} 
                        onMouseEnter={() => setHoveredNavButton('list')}
                        onMouseLeave={() => setHoveredNavButton(null)}
                        style={getNavButtonStyle('list')}
                    >
                        Employee List
                    </button>
                    
                    {/* Add Employee Button - PURPLE Glow/Active */}
                    <button 
                        onClick={() => setActiveView('add')} 
                        onMouseEnter={() => setHoveredNavButton('add')}
                        onMouseLeave={() => setHoveredNavButton(null)}
                        style={getNavButtonStyle('add')}
                    >
                        + Add Employee
                    </button>
                    {/* Settings and Reports buttons are now intentionally removed from the JSX */}
                </nav>
                <footer style={dashboardStyles.footer}>
                    Developed by Deekshith gowda kvs
                </footer>
            </div>

            {/* Main Content Area */}
            <div style={dashboardStyles.mainContent}>
                <header style={dashboardStyles.header}>
                    <p>Welcome back, {user.username}!</p>
                    <button onClick={handleLogout} style={dashboardStyles.logoutButton}>
                        LOGOUT
                    </button>
                </header>
                
                <div style={dashboardStyles.contentArea}>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

// --- UPDATED STYLES FOR CONSISTENT BRIGHT PURPLE GLOW ---
const dashboardStyles = {
    // ... (Existing Charcoal Backgrounds for Container, Sidebar, Header, etc.) ...
    container: { display: 'flex', minHeight: '100vh', backgroundColor: '#1e2a36', },
    sidebar: { width: '250px', backgroundColor: '#2c3e50', color: 'white', display: 'flex', flexDirection: 'column', paddingTop: '20px', },
    logo: { padding: '0 20px 30px', fontSize: '1.5rem', fontWeight: 'bold', color: '#ecf0f1', borderBottom: '1px solid #34495e', marginBottom: '10px', },
    
    // Sidebar base button style - Transparent background on charcoal sidebar
    navButton: {
        width: '100%',
        textAlign: 'left',
        padding: '15px 20px',
        backgroundColor: 'transparent', // Default is transparent (charcoal background shows through)
        border: 'none',
        color: '#bdc3c7', // Default light gray text
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'all 0.3s ease-in-out', 
        textShadow: 'none', 
    },

    // NEW: BRIGHT PURPLE GLOW STYLES (Used for BOTH List and Add)
    purpleHoverGlow: {
        backgroundColor: 'rgba(168, 85, 247, 0.15)', // Light translucent purple background
        boxShadow: '0 0 15px #a855f7', // Bright Purple Glow effect
        color: '#a855f7', // Purple text color
    },
    // NEW: BRIGHT PURPLE ACTIVE STYLE (Used for BOTH List and Add when selected)
    purpleActiveStyle: {
        backgroundColor: 'rgba(168, 85, 247, 0.2)', // Slightly darker translucent base when active
        color: '#a855f7',
        fontWeight: 'bold',
        borderLeft: '4px solid #a855f7', // Visual indicator
    },

    footer: { padding: '15px 20px', fontSize: '0.8rem', color: '#7f8c8d', borderTop: '1px solid #34495e', },
    mainContent: { flexGrow: 1, display: 'flex', flexDirection: 'column', },
    header: { padding: '20px 30px', backgroundColor: '#2c3e50', borderBottom: '1px solid #455a64', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#ecf0f1', },
    logoutButton: { backgroundColor: '#e74c3c', color: 'white', padding: '8px 15px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold', },
    contentArea: { padding: '30px', flexGrow: 1, backgroundColor: '#1e2a36', color: '#ecf0f1', },
    contentCard: { backgroundColor: '#2c3e50', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)', color: '#ecf0f1', }
};

export default EmployeeDashboard;
