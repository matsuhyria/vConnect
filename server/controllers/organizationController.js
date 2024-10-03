const Opportunity = require('../models/opportunity');
const Organization = require('../models/organization');

const createOrganization = async (req, res) => {
    const { name,
        email,
        address,
        phone,
        description,
        rating } = req.body;
    try {
        const organization = new Organization({
            name,
            email,
            address,
            phone,
            managed_by: req.user.userId,
            description,
            rating
        });
        await organization.save();

        res.status(201).json({ message: 'Organization created!', organization });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

const getAllOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.find();

        res.status(200).json(organizations);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retreive organizations' });
    }
};

const getOrganizationById = async (req, res) => {
    const { id } = req.params;
    try {
        const organization = await Organization.findById(id);

        if (!organization) {
            return res.status(404).json({ error: 'Organization not found' });
        }

        res.status(200).json(organization);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid organization ID' });
        }
        console.error(err);
        return res.status(500).json({ error: 'Failed to retreive organization by id' });
    }
};

const updateOrganizationById = async (req, res) => {
    const { id } = req.params;
    const { name, description, managed_by, email, address, rating } = req.body;

    try {
        const organization = await Organization.findByIdAndUpdate(
            id,
            { $set: { name, description, managed_by, email, address, rating } },
            { new: true } // new: true is needed to get the updated object 
        );

        if (!organization) {
            res.status(404).json({ error: 'Organization not found' });
        }

        res.status(200).json(organization);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid organization ID' });
        }
        console.error(err);
        return res.status(500).json({ error: 'Failed to update organization' });
    }
};

const deleteOrganizationById = async (req, res) => {
    const { id } = req.params;

    try {
        const organization = await Organization.findByIdAndDelete(id);

        if (!organization) {
            return res.status(404).json({ error: 'Organization not found' });
        }

        Opportunity.deleteMany({ organizationId: organization._id });

        res.status(200).json({ message: 'Organization deleted successfully' });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid organization ID' });
        }
        console.error(err);
        res.status(500).json({ error: 'Failed to delete organization' });
    }
};

module.exports = { createOrganization, getAllOrganizations, getOrganizationById, updateOrganizationById, deleteOrganizationById };
