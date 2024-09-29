const { TOKEN_COOKIE_NAME } = require("../../helpers/constants");
const { verifyToken } = require("../../helpers/jwt");

// middleware for verifying token, roles, and ownership
const verifyAccess = ({ requiredType = "volunteer", checkOwnUser = false } = {}) => {
    return (req, res, next) => {

        const token = req.headers.cookie.slice(`${TOKEN_COOKIE_NAME}=`.length); // Get the token from cookies

        if (!token) {
            return res.status(401).send('Access denied: No token provided');
        }

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
