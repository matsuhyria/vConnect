const { TOKEN_COOKIE_NAME } = require('../../helpers/constants');
const { verifyToken } = require('../../helpers/jwt');

// middleware for verifying token, roles, and ownership
const verifyAccess = ({ requiredType = null, checkOwnUser = false } = {}) => {
    return (req, res, next) => {

        const authHeader = req.headers.authorization;

        // Check if Authorization header exists
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization header is missing.' });
        }

        const token = authHeader.split(' ')[1];

        try {
            req.user = verifyToken(token); // Attach the decoded user information to the request

            // Check if a specific role is required and if the user meets that role
            if (requiredType && req.user.type !== requiredType) {
                return res.status(403).json({ message: 'Access Denied: Insufficient Permissions' });
            }


            // Check ownership if required
            if (checkOwnUser && req.params.id && req.params.id !== req.user.userId) {
                return res.status(403).json({ message: 'Access Denied: Insufficient Permissions' });
            }

            next();
        } catch (err) {
            console.error(err);
            res.clearCookie(TOKEN_COOKIE_NAME); // Clear the token from cookies if it is invalid
            return res.status(403).json({ message: 'Invalid Token', err });
        }
    };
};

module.exports = verifyAccess;
