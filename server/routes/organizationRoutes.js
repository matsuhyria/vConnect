const express = require('express');
const router = express.Router();

const { createOrganization } = require('../contollers/organizationController');

router.post('/api/v1/organizations', createOrganization);

module.exports = router;
