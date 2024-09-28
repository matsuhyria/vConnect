const express = require("express");
const router = express.Router();

const { createOpportunity, getPaginatedOpportunities, getOpportunity, getOpportunitiesByOrg, updateOpportunity, deleteOpportunity } = require("../controllers/opportunityController");

router.route('/api/v1/opportunities')
    .post(createOpportunity)
    .get(getPaginatedOpportunities);

router.route('/api/v1/opportunities/:id')
    .get(getOpportunity)
    .put(updateOpportunity)
    .patch(updateOpportunity)
    .delete(deleteOpportunity);

router.route('/api/v1/organizations/:id/opportunities')
    .get(getOpportunitiesByOrg);

module.exports = router;
