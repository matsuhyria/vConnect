const Opportunity = require("../models/opportunity");
const Organization = require("../models/organization")

const createOpportunity = async (req, res) => {
    const { title, date, address, description, organizationId } = req.body;
    const opportunity = new Opportunity({
        title,
        date,
        address,
        description,
        organizationId
    });
    try {
        await opportunity.save();
        return res.status(201).json({ message: "Opportunity created!", opportunity });
    } catch (err) {
        console.error(err)
        return res.status(400).send({ message: err.message });
    }
};

const getPaginatedOpportunities = async (req, res) => {
    const page = parseInt(req.query.page) || 1;

    if(page <= 0) {
        return res.status(400).json({ message: "Invalid page parameter. It must a positive integer" });
    }

    const limit = parseInt(req.query.limit) || 10;
    
    if(limit  <= 0) {
        return res.status(400).json({ message: "Invalid limit parameter. It must a positive integer" });
    }

    const skip = (page - 1) * limit;

    try {
        const opportunities = await Opportunity.find()
            .skip(skip)
            .limit(limit);

        if (!opportunities) return res.status(404).json({ message: "Opportunities not found" });

        const itemsCount = await Opportunity.countDocuments();

        res.status(200).json({
            page,
            limit,
            totalPages: Math.ceil(itemsCount / limit),
            data: opportunities,
        });
    } catch {
        console.error(err)
        return res.status(500).json({ message: 'Server Error', err });
    }
};

const getOpportunity = async (req, res) => {
    try {
        const opportunity = await Opportunity.findById(req.params.id);
        if (!opportunity) return res.status(404).json({ message: "Opportunity not found" });
        res.status(200).json(opportunity);
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Server Error', err });
    }
};


const getOpportunitiesByOrg = async (req, res) => {
    try {
        const opportunity = await Opportunity.find({ organizationId: req.params.id }); 
        if (!opportunity) return res.status(404).json({ message: "Opportunities for this organization not found" });
        res.status(200).json(opportunity);
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Server Error', err });
    }
};

const updateOpportunity = async (req, res) => {
    const { title, date, address, description, organizationId } = req.body;
    try {
        const opportunity = await Opportunity.findByIdAndUpdate(
            req.params.id,
            { $set: { title, date, address, description, organizationId } },
            { new: true }
        );
        if (!opportunity) return res.status(404).json({ message: "Opportunity not found" });
        res.status(201).json(opportunity);
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Server Error', err });
    }
};

const deleteOpportunity = async (req, res) => {
    try {
        const opportunity = await Opportunity.findByIdAndDelete(req.params.id);
        if (!opportunity) return res.status(404).json({ message: "Opportunity not found" });
        res.status(200).json({ message: "Opportunity deleted!", opportunity });
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Server Error', err });
    }
};

module.exports = { createOpportunity, getPaginatedOpportunities, getOpportunity, getOpportunitiesByOrg, updateOpportunity, deleteOpportunity };
