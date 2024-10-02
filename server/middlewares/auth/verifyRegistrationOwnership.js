const Registration = require('../../models/registration');

/**
 * Middleware to check if the requesting user owns the registration
 */
const verifyRegistrationOwnership = () => {
    return async (req, res, next) => {
        try {
            const id = req.params.id;

            const registration = await Registration.findById(id);

            if (!registration) {
                return res.status(404).json({ message: 'Registration not found' });
            }

            if (!registration.user.equals(req.user.userId)) {
                return res.status(403).json({ message: 'Access Denied: Insufficient Permissions' });
            }

            req.registration = registration;

            next();
        } catch (error) {
            console.error('Error in ownership middleware:', error);
            if (err.kind === 'ObjectId') {
                return res.status(400).json({ error: 'Invalid registration ID' });
            }
            return res.status(500).json({ message: 'Server Error', error: error.message });
        }
    }
};

module.exports = verifyRegistrationOwnership;
