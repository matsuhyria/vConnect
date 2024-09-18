const express = require("express");
const router = express.Router();

const { createOpportunity, getOpportunities, getOpportunity, updateOpportunity, deleteOpportunity } = require("../controllers/opportunityController");

router.post("/api/v1/opportunities", createOpportunity);

router.get("/api/v1/opportunities", getOpportunities);

router.get("/api/v1/opportunities/:id", getOpportunity);

router.put("/api/v1/opportunities/:id", updateOpportunity);

router.patch("/api/v1/opportunities/:id", updateOpportunity);

router.delete("/api/v1/opportunities/:id", deleteOpportunity);


module.exports = router;
