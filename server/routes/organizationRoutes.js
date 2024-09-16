const express = require('express');
const router = express.Router();

const { createOrganization, getAllOrganizations, getOrganizationById, updateOrganizationById, deleteOrganizationById} = require('../contollers/organizationController');

router.post('/api/v1/organizations', createOrganization);
router.get('/api/v1/organizations', getAllOrganizations);
router.get('/api/v1/organizations/:id', getOrganizationById);
router.patch('/api/v1/organizations/:id', updateOrganizationById);
router.put('/api/v1/organizations/:id', updateOrganizationById);
router.delete('/api/v1/organizations/:id', deleteOrganizationById);

module.exports = router;
