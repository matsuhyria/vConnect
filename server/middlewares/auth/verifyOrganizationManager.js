const Organization = require('../../models/organization');

// middleware for verifying organization manager
const verifyOrganizationManager = () => {
    return async (req, res, next) => {
        try {
            const organizationId = req.body.organizationId || req.params.organizationId || req.params.id;
            const userId = req.user.userId;

            const organization = await Organization.findById(organizationId);
            if (!organization) {
                return res.status(404).json({ message: 'Organization not found' });
            }

            // Check if the user is the organization's manager
            if (!organization.managed_by.equals(userId)) {
                return res.status(403).json({
                    message: 'You are not authorized to perform this action',
                });
            }

            next();
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server Error', err });
        }
    };
};

module.exports = verifyOrganizationManager;
