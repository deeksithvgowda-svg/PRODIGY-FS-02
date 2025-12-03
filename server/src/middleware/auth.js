// server/src/middleware/auth.js

const jwt = require('jsonwebtoken');

// Middleware function to check for a valid JWT token
module.exports = function (req, res, next) {
    // 1. Get token from the header (standard practice is to use 'x-auth-token')
    const token = req.header('x-auth-token');

    // 2. Check if no token is present
    if (!token) {
        // 401: Unauthorized
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // 3. Verify token
    try {
        // Decode the token using the secret key from your .env file
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach the user information (id, role) from the token payload to the request object
        // This makes the user's ID available in every protected route
        req.user = decoded.user;
        
        // Success: Move to the next middleware or the route handler function
        next(); 
    } catch (err) {
        // If verification fails (e.g., token is expired or invalid)
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
