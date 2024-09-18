const Opportunity = require("../models/opportunity");

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
        return res.json({ message: "Opportunity created!", opportunity });
    } catch (err) {
        console.error(err)
        return res.status(400).send({ message: err.message });
    }
};

const getOpportunities = async (req, res) => {
    try {
        const opportunities = await Opportunity.find({});
        if (!opportunities) return res.status(404).json({ message: "Opportunities not found" });
        res.json(opportunities);
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Server Error', err });
    }
};

const getOpportunity = async (req, res) => {
    try {
        const opportunity = await Opportunity.findById(req.params.id);
        if (!opportunity) return res.status(404).json({ message: "Opportunity not found" });
        res.json(opportunity);
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
        res.json(opportunity);
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Server Error', err });
    }
};

const deleteOpportunity = async (req, res) => {
    try {
        const opportunity = await Opportunity.findByIdAndDelete(req.params.id);
        if (!opportunity) return res.status(404).json({ message: "Opportunity not found" });
        res.json({ message: "Opportunity deleted!", opportunity });
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Server Error', err });
    }
};

module.exports = { createOpportunity, getOpportunities, getOpportunity, updateOpportunity, deleteOpportunity };
