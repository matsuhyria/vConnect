const jwt = require('jsonwebtoken');
const { TOKEN_SECRET, TOKEN_EXPIRES_IN } = require('./constants');

const generateToken = (payload) => {
    return jwt.sign(payload, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
};

const verifyToken = (token) => {
    return jwt.verify(token, TOKEN_SECRET);
};

module.exports = { generateToken, verifyToken };
