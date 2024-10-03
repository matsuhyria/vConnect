const express = require('express');
const router = express.Router();

const { BASE_PATH } = require('../helpers/constants');
const {
    createOpportunity,
    getOpportunities,
    getOpportunity,
    getOpportunitiesPerOrganization,
    deleteOpportunitiesPerOrganization,
    updateOpportunity,
    deleteOpportunity
} = require('../controllers/opportunityController');
const verifyAccess = require('../middlewares/auth/verifyAccess');
const verifyOrganizationManager = require('../middlewares/auth/verifyOrganizationManager');

// Define routes for opportunities API.
router.route(`${BASE_PATH}/opportunities`)
    // Get all opportunities with pagination
    .get(getOpportunities);

router.route(`${BASE_PATH}/opportunities/:id`)
    // Get an existing opportunity by ID
    .get(getOpportunity);

router.route(`${BASE_PATH}/organizations/:organizationId/opportunities/:id`)
    // Get an existing opportunity by ID
    .get(getOpportunity)
    // Update an existing opportunity
    .put(
        verifyAccess({ requiredType: 'organization_representative' }),
        verifyOrganizationManager(),
        updateOpportunity
    )
    // Patch an existing opportunity
    .patch(
        verifyAccess({ requiredType: 'organization_representative' }),
        verifyOrganizationManager(),
        updateOpportunity
    )
    // Delete an existing opportunity
    .delete(
        verifyAccess({ requiredType: 'organization_representative' }),
        verifyOrganizationManager(),
        deleteOpportunity
    );


// Define route parameters and HTTP methods for individual opportunities.
router.route(`${BASE_PATH}/organizations/:organizationId/opportunities`)
    // Get all opportunities for a specific organization
    .get(getOpportunitiesPerOrganization)
    // Create a new opportunity
    .post(
        verifyAccess({ requiredType: 'organization_representative' }),
        verifyOrganizationManager(),
        createOpportunity
    )
    // Delete all opportunities for a specific organization
    .delete(
        verifyAccess({ requiredType: 'organization_representative' }),
        verifyOrganizationManager(),
        deleteOpportunitiesPerOrganization
    );


module.exports = router;
