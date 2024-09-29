const Registration = require('../models/registration');
const Opportunity = require('../models/opportunity');

const createRegistration = async (req, res) => {
    const { id } = req.params;

    try {
        const opportunity = await Opportunity.findById(id);

        if (!opportunity) {
            return res.status(404).json({ error: 'Opportunity not found' });
        }

        const registration = new Registration({
            date: Date.now(),
            user: req.user.userId,
            opportunity: id,
        });

        const savedRegistration = await registration.save();
        res.status(201).json({ message: "Registration has been created", savedRegistration });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

const getAllUserRegistrations = async (req, res) => {
    const { id } = req.params;

    try {
        const registrations = await Registration.find({
            user: req.user.userId,
            opportunity: id
        });

        if (!registrations) {
            return res.status(404).json({ error: 'Registrations not found' });
        }

        res.status(200).json(registrations);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve registrations' });
    }
};

const getRegistrationById = async (req, res) => {
    res.status(200).json(req.registration);
};

const getRegistrationsPerOpportunity = async (req, res) => {
    const { id } = req.params;

    try {
        const registration = await Registration.find({ opportunity: id });

        if (!registration) {
            return res.status(404).json({ error: 'Registration for this opportunity not found' });
        }

        res.status(200).json(registration);
    } catch (err) {
        console.log(err);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid opportunity ID' });
        }
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

        res.status(200).json(registration);
    } catch (err) {
        console.log(err);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid registration ID' });
        }
        return res.status(500).json({ error: 'Failed to update registration' });
    }
};

const deleteRegistrationById = async (req, res) => {
    const { id } = req.params;

    try {
        const registration = await Registration.findOneAndDelete(id);

        res.status(200).json({ message: 'Registration deleted successfully', registration });
    } catch (err) {
        console.log(err);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid registration ID' });
        }
        res.status(500).json({ error: 'Failed to delete registration' });
    }
};

module.exports = {
    createRegistration,
    getAllUserRegistrations,
    getRegistrationById,
    getRegistrationsPerOpportunity,
    updateRegistrationById,
    deleteRegistrationById
};
