// client/src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const LoginPage = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    
    // NEW STATE: Tracks hover state for the SIGN IN button
    const [hoveredButton, setHoveredButton] = useState(null); 
    
    const navigate = useNavigate();

    const { username, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        try {
            const res = await api.post('/auth/login', { username, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.msg || 'Login failed. Please check credentials.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };
    
    // Function to get button style based on hover state (Purple Glow)
    const getButtonStyle = (baseStyle, hoverStyle, buttonType) => {
        const isHovered = hoveredButton === buttonType;
        return isHovered ? { ...baseStyle, ...hoverStyle } : baseStyle;
    };

    return (
        <div style={loginStyles.pageBackground}> 
            <div style={loginStyles.card}>
                <h2 style={loginStyles.title}>
                    Employee Portal Login
                </h2>
                <form onSubmit={onSubmit}>
                    {/* Error Message Display */}
                    {error && <p style={loginStyles.error}>{error}</p>}
                    
                    {/* Username Field */}
                    <div style={loginStyles.formGroup}>
                        <label htmlFor="username" style={loginStyles.label}>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={onChange}
                            placeholder="Enter the username" 
                            required
                            style={loginStyles.input} // Apply the new input style
                        />
                    </div>

                    {/* Password Field with Visibility Toggle (SVG Eye Icon) */}
                    <div style={loginStyles.formGroup}>
                        <label htmlFor="password" style={loginStyles.label}>Password</label>
                        <div style={loginStyles.passwordWrapper}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={password}
                                onChange={onChange}
                                placeholder="Enter password" 
                                required
                                // Apply the new input style, merged with padding-right
                                style={{ ...loginStyles.input, paddingRight: '45px' }} 
                            />
                            
                            {/* THE PASSWORD VISIBILITY TOGGLE BUTTON (SVG) */}
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                style={loginStyles.toggleButton}
                                title={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {/* Conditional Rendering of the SVG Icon (Icon color is changed in styles) */}
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={loginStyles.svgIcon}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.679 5.679a5.001 5.001 0 01-8.529-3.95m7.85-2.05l-2.05 2.05m-3.95 7.85a5.001 5.001 0 01-3.95-8.529m7.85-2.05l-2.05 2.05M2.432 10.158A11.956 11.956 0 0112 1c4.97 0 9.213 2.91 11 7.234" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={loginStyles.svgIcon}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )} 
                            </button>
                        </div>
                    </div>

                    {/* SIGN IN BUTTON (with Purple Glow) */}
                    <button 
                        type="submit" 
                        onMouseEnter={() => setHoveredButton('submit')}
                        onMouseLeave={() => setHoveredButton(null)}
                        style={getButtonStyle(
                            loginStyles.submitButton, 
                            loginStyles.submitButtonHover, 
                            'submit'
                        )}
                    >
                        SIGN IN
                    </button>
                </form>
            </div>
            
            {/* Watermark/Credits at the bottom of the page */}
            <footer style={loginStyles.footer}>
                Developed by Deekshith gowda kv
            </footer>
        </div>
    );
};

// --- UPDATED DARK THEME STYLES ---
const loginStyles = {
    // 1. DARK PAGE BACKGROUND
    pageBackground: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1e2a36', // Dark background to match dashboard
    },
    // 2. DARK CARD
    card: {
        padding: '50px 40px',
        backgroundColor: '#2c3e50', // Dark card background
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)', // Stronger shadow for depth
        width: '400px',
        maxWidth: '90%',
        border: '1px solid #34495e',
        marginBottom: '20px', 
    },
    title: {
        marginBottom: '25px', 
        textAlign: 'center', 
        color: '#ffffff', // White title text
        fontSize: '1.8rem',
    },
    formGroup: {
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontWeight: '600',
        fontSize: '0.95rem',
        color: '#ecf0f1', // Light gray label text
    },
    // 3. DARK INPUT FIELDS
    input: {
        width: '100%',
        padding: '12px 15px',
        border: '1px solid #455a64',
        borderRadius: '6px',
        backgroundColor: '#34495e', // Darker input background
        color: '#ecf0f1', // Light text input
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
    passwordWrapper: {
        position: 'relative',
    },
    // 4. ICON TOGGLE BUTTON
    toggleButton: {
        position: 'absolute',
        right: '1px',
        top: '0', 
        bottom: '0',
        padding: '0 12px',
        backgroundColor: 'transparent', 
        border: 'none', 
        cursor: 'pointer',
        transition: 'color 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    svgIcon: {
        width: '20px',
        height: '20px',
        color: '#bdc3c7', // Icon color (light gray)
    },
    // 5. SIGN IN BUTTON (Base White)
    submitButton: {
        width: '100%', 
        padding: '12px', 
        marginTop: '20px',
        backgroundColor: '#ffffff', // Default white background
        color: '#2c3e50', // Dark text
        border: '1px solid #ffffff',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'all 0.2s ease-in-out',
    },
    // 6. SIGN IN BUTTON HOVER (Bright Purple Glow)
    submitButtonHover: {
        backgroundColor: '#a855f7', // Bright Purple
        color: 'white',
        border: '1px solid #a855f7',
        boxShadow: '0 0 15px #a855f7', // The Glow effect
    },
    // 7. FOOTER
    footer: {
        marginTop: '20px',
        padding: '10px 0',
        color: '#7f8c8d', // Muted text for credits
        fontSize: '0.9rem',
        textAlign: 'center',
        width: '100%',
    }
};

export default LoginPage;
