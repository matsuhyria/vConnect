const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('./constants');

const generateToken = (payload) => {
    return jwt.sign(payload, TOKEN_SECRET, { expiresIn: '24h' });
}

const verifyToken = (token) => {
    return jwt.verify(token, TOKEN_SECRET);
}

module.exports = { generateToken, verifyToken };
