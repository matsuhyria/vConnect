const express = require('express');
const router = express.Router();

const { BASE_PATH } = require('../helpers/constants');
const {
    createOrganization,
    getAllOrganizations,
    deleteAllOrganizations,
    getOrganizationById,
    updateOrganizationById,
    deleteOrganizationById
} = require('../controllers/organizationController');
const verifyAccess = require('../middlewares/auth/verifyAccess');
const verifyOrganizationManager = require('../middlewares/auth/verifyOrganizationManager');

// Route for creating an organization and retrieving all organizations
router.route(`${BASE_PATH}/organizations`)
    // Create a new organization
    .post(
        verifyAccess({ requiredType: 'organization_representative' }),
        createOrganization
    )
    // Retrieve all organizations
    .get(getAllOrganizations)
    // Delete all organizations
    .delete(
        verifyAccess({ requiredType: 'admin' }),
        deleteAllOrganizations
    );

// Route for retrieving, updating, or deleting an organization by ID
router.route(`${BASE_PATH}/organizations/:id`)
    // Retrieve an organization by ID
    .get(getOrganizationById)
    // Update an existing organization by ID (using both PATCH and PUT methods)
    .patch(
        verifyAccess({ requiredType: 'organization_representative' }),
        verifyOrganizationManager(),
        updateOrganizationById
    )
    .put(
        verifyAccess({ requiredType: 'organization_representative' }),
        verifyOrganizationManager(),
        updateOrganizationById
    )
    // Delete an organization by ID
    .delete(
        verifyAccess({ requiredType: 'organization_representative' }),
        verifyOrganizationManager(),
        deleteOrganizationById
    );

module.exports = router;
