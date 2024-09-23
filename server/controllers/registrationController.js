const Registration = require('../models/registration');
const Opportunity = require('../models/opportunity');
const User = require('../models/user');

const createRegistration = async (req, res) => {
    const { user_id, opportunity_id } = req.params;

    try {
        const user = await User.findById(user_id);
        const opportunity = await Opportunity.findById(opportunity_id);

        if (!user || !opportunity) {
            return res.status(404).json({ error: 'User or Opportunity not found' });
        }

        const registration = new Registration({
            user: user_id,
            opportunity: opportunity_id,
        });

        const savedRegistration = await registration.save();
        res.status(201).json(savedRegistration);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

// get all regs for specific user
const getAllRegistrations = async (req, res) => {
    const { user_id, opportunity_id } = req.params;

    try {
        const registrations = await Registration.find({
            user: user_id,
            opportunity: opportunity_id
        });

        res.status(200).json(registrations);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve registrations' });
    }
};

const getRegistrationById = async (req, res) => {
    const { id } = req.params;

    try {
        const registration = await Registration.findById(id);

        if (!registration) {
            return res.status(404).json({ error: 'Registration not found' });
        }

        res.status(200).json(registration);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid registration ID' });
        }
        console.log(err);
        return res.status(500).json({ error: 'Failed to retrieve registration' });
    }
};

const getRegistrationByOppId = async (req, res) => {
    const { id } = req.params;

    try {
        const registration = await Registration.find({ opportunity: id });

        if (!registration) {
            return res.status(404).json({ error: 'Registration for this opportunity not found' });
        }

        res.status(200).json(registration);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid opportunity ID' });
        }
        console.log(err);
        return res.status(500).json({ error: 'Failed to retrieve registration' });
    }
};

const updateRegistrationById = async (req, res) => {
    const { id } = req.params;

    try {
        const registration = await Registration.findByIdAndUpdate(
             id,
            { $set: req.body },
            { new: true }
        );

        if (!registration) {
            return res.status(404).json({ error: 'Registration not found' });
        }

        res.status(200).json(registration);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid registration ID' });
        }
        console.log(err);
        return res.status(500).json({ error: 'Failed to update registration' });
    }
};

const deleteRegistrationById = async (req, res) => {
    const { id } = req.params;

    try {
        const registration = await Registration.findOneAndDelete(id);

        if (!registration) {
            return res.status(404).json({ error: 'Registration not found' });
        }

        res.status(200).json({ message: 'Registration deleted successfully' });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid registration ID' });
        }
        console.log(err);
        res.status(500).json({ error: 'Failed to delete registration' });
    }
};

module.exports = {
    createRegistration,
    getAllRegistrations,
    getRegistrationById,
    getRegistrationByOppId,
    updateRegistrationById,
    deleteRegistrationById
};
