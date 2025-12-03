// client/src/App.jsx

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import EmployeeDashboard from './pages/EmployeeDashboard';
import NotFound from './pages/NotFound'; // Placeholder for 404

// Placeholder for our ProtectedRoute component (to be created later)
const ProtectedRoute = ({ children }) => {
    // Basic check: in a real app, this logic would be more robust using Context/State
    const token = localStorage.getItem('token');
    
    // If a token exists, render the child component (the protected page)
    // If no token, redirect to the login page
    return token ? children : <Navigate to="/login" replace />;
};


function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* The Login Page (Public) */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* The Protected Dashboard Page */}
                    {/* Only accessible if the user has a token (via ProtectedRoute) */}
                    <Route 
                        path="/dashboard" 
                        element={
                            <ProtectedRoute>
                                <EmployeeDashboard />
                            </ProtectedRoute>
                        } 
                    />

                    {/* Default route to redirect to login */}
                    <Route path="/" element={<Navigate to="/login" replace />} />

                    {/* 404 Not Found Page */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
