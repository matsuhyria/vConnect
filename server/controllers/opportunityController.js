const bcrypt = require('bcrypt');
const Opportunity = require('../models/opportunity');
const Registration = require('../models/registration');
const { applyPagination, applyDateFiltration } = require('../helpers/queryUtils');

const createOpportunity = async (req, res) => {
    const { organizationId } = req.params;
    const { title, date, address, description } = req.body;

    if (!date || isNaN(new Date(date).getTime())) {
        return res.status(400).json({ message: 'Invalid opportunity date' });
    }

    const opportunity = new Opportunity({
        title,
        date,
        address,
        description,
        organizationId
    });
    try {
        await opportunity.save();
        return res.status(201).json({ message: 'Opportunity created!', opportunity });
    } catch (err) {
        console.error(err);
        return res.status(400).send({ message: err.message });
    }
};

const getOpportunities = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const date = req.query.date && req.query.date !== 'null' && req.query.date !== 'undefined' ? req.query.date : new Date();

    if (page <= 0 || limit <= 0) {
        return res.status(400).json({ message: 'Invalid page or limit parameter. It must be a positive integer.' });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date format. Please provide a valid date in the YYYY-MM-DD format.' });
    }

    try {
        let query = Opportunity.find();

        // Apply date filtration to the query
        query = applyDateFiltration(query, parsedDate);

        const countQuery = query.clone(); // Clone the filtered query for count

        query = applyPagination(query, page, limit);

        const opportunities = await query.exec();

        if (!opportunities) return res.status(404).json({ message: 'Opportunities not found' });

        const itemsCount = await countQuery.countDocuments().exec();
        const totalPages = Math.ceil(itemsCount / limit);

        res.status(200).json({
            page,
            limit,
            totalPages,
            data: opportunities,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error', err });
    }
};

const getOpportunity = async (req, res) => {
    try {
        const opportunity = await Opportunity.findById(req.params.id);
        if (!opportunity) return res.status(404).json({ message: 'Opportunity not found' });
        res.status(200).json(opportunity);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error', err });
    }
};

const deleteAllOpportunities = async (req, res) => {
    try {
        const deletedOpportunities = await Opportunity.deleteMany({});

        res.status(200).json({ deletedOpportunities });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error', err });
    }
};

const getOpportunitiesPerOrganization = async (req, res) => {
    const { organizationId } = req.params;

    try {
        let query = Opportunity.find({ organizationId });
        const opportunities = await query.exec();
        if (!opportunities) return res.status(404).json({ message: 'Opportunities for this organization not found' });
        res.status(200).json(opportunities);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error', err });
    }
};

const updateOpportunity = async (req, res) => {
    try {
        const { organizationId } = req.params;
        const { title, date, address, description } = req.body;
        const opportunity = await Opportunity.findByIdAndUpdate(
            req.params.id,
            { $set: { title, date, address, description, organizationId } },
            { new: true }
        );
        if (!opportunity) return res.status(404).json({ message: 'Opportunity not found' });
        res.status(201).json(opportunity);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error', err });
    }
};

const deleteOpportunity = async (req, res) => {
    try {
        const opportunity = await Opportunity.findByIdAndDelete(req.params.id);
        if (!opportunity) return res.status(404).json({ message: 'Opportunity not found' });

        Registration.deleteMany({ opportunity: opportunity._id });

        res.status(200).json({ message: 'Opportunity deleted!', opportunity });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error', err });
    }
};

const encryptOpportunityId = async (req, res) => {
    try {
        const { id } = req.params;
        const encryptedId = await bcrypt.hash(id, 10);
        res.status(200).json(encryptedId);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error', err });
    }
};

module.exports = {
    createOpportunity,
    getOpportunities,
    deleteAllOpportunities,
    getOpportunity,
    getOpportunitiesPerOrganization,
    updateOpportunity,
    deleteOpportunity,
    encryptOpportunityId
};
