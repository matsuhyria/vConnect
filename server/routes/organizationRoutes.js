const express = require('express');
const router = express.Router();

const { createOrganization, getAllOrganizations, getOrganizationById, updateOrganizationById, deleteOrganizationById } = require('../controllers/organizationController');

router.route('/api/v1/organizations')
    .post(createOrganization)
    .get(getAllOrganizations);

router.route('/api/v1/organizations/:id')
    .get(getOrganizationById)
    .patch(updateOrganizationById)
    .put(updateOrganizationById)
    .delete(deleteOrganizationById);

module.exports = router;
