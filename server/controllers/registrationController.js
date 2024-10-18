const bcrypt = require('bcrypt');
const Registration = require('../models/registration');
const Opportunity = require('../models/opportunity');

const createRegistration = async (req, res) => {
    const { id } = req.params;

    try {
        const opportunity = await Opportunity.findById(id);

        if (!opportunity) {
            return res.status(404).json({ message: 'Opportunity not found' });
        }

        if (opportunity.status === 'canceled') {
            return res.status(400).json({ message: 'Opportunity canceled' });
        }

        if (new Date(opportunity.date) < Date.now()) {
            return res.status(400).json({ message: 'Opportunity expired' });
        }

        const registration = new Registration({
            date: Date.now(),
            user: req.user.userId,
            opportunity: id,
        });

        await registration.save();

        res.status(201).json({ message: 'Registration has been created', registration });
    } catch (err) {
        console.error(err);
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
            return res.status(404).json({ message: 'Registrations not found' });
        }

        res.status(200).json(registrations);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve registrations' });
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
            return res.status(404).json({ message: 'Registration for this opportunity not found' });
        }

        res.status(200).json(registration);
    } catch (err) {
        console.error(err);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid opportunity ID' });
        }
        return res.status(500).json({ message: 'Failed to retrieve registration' });
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
        console.error(err);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid registration ID' });
        }
        return res.status(500).json({ message: 'Failed to update registration' });
    }
};

const deleteRegistrationById = async (req, res) => {
    const { id } = req.params;

    try {
        const registration = await Registration.findOneAndDelete(id);

        res.status(200).json({ message: 'Registration deleted successfully', registration });
    } catch (err) {
        console.error(err);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid registration ID' });
        }
        res.status(500).json({ message: 'Failed to delete registration' });
    }
};

const confirmAttendance = async (req, res) => {
    try {
        const { opportunityId, id } = req.params;
        const { encryptedOpportunityId } = req.body;
        console.log('encryptedOpportunityId', encryptedOpportunityId);
        console.log('opportunityId', opportunityId);


        const isMatchingOpportunity = await bcrypt.compare(opportunityId, encryptedOpportunityId);
        console.log('isMatchingOpportunity', isMatchingOpportunity);

        if (!isMatchingOpportunity) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const registration = await Registration.findByIdAndUpdate(
            id,
            { $set: { status: 'confirmed' } },
            { new: true }
        );

        if (!registration) {
            return res.status(404).json({ message: 'Registration not found' });
        }

        res.status(200).json({ message: 'Attendance confirmed', registration });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to confirm attendance' });
    }

};

module.exports = {
    createRegistration,
    getAllUserRegistrations,
    getRegistrationById,
    getRegistrationsPerOpportunity,
    updateRegistrationById,
    deleteRegistrationById,
    confirmAttendance
};
