const Organization = require('../models/organization');

const createOrganization = async (req, res) => {
    const { name, description, managed_by, email, address } = req.body;
    try {
        if(!name || !description || !managed_by || !email || !address) {
            return res.status(400).json({ error: 'All following fields are required: name, description, managed_by, email and address'}); 
        }
    
        const organization = new Organization(req.body);
        const savedOrg = await organization.save();

        res.status(201).json(savedOrg);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createOrganization };
