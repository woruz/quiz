const jwt = require('jsonwebtoken');


exports.authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ msg: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.secret);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Invalid token.' });
    }
};