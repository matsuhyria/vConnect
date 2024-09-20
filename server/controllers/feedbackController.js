const Feedback = require('../models/feedback');
const User = require('../models/user');
const Opportunity = require('../models/opportunity');

const createFeedback = async (req, res) => {
    const { opportunity_id } = req.params;
    const { user_id, rating, comment } = req.body;

    try {
        // Check if the user and opportunity exist
        const existingUser = await User.findById(user_id);
        const existingOpportunity = await Opportunity.findById(opportunity_id);

        if (!existingUser || !existingOpportunity) {
            return res.status(404).json({ error: 'User or Opportunity not found' });
        }

        const feedback = new Feedback({
            user: user_id,
            opportunity: opportunity_id,
            rating,
            comment,
            registrationDate: Date.now()
        });

        const savedFeedback = await feedback.save();
        res.status(201).json(savedFeedback);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

const getAllFeedbacks = async (req, res) => {
    const { opportunity_id } = req.params;

    try {
        const feedbacks = await Feedback.find({ opportunity: opportunity_id });

        if (feedbacks.length === 0) {
            return res.status(404).json({ message: 'No feedbacks found for this opportunity' });
        }

        res.status(200).json(feedbacks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve feedbacks' });
    }
};

// Get a specific feedback by ID
const getFeedbackById = async (req, res) => {
    const { opportunity_id, feedback_id } = req.params;

    try {
        const feedback = await Feedback.findOne({
            _id: feedback_id,
            opportunity: opportunity_id
        });

        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }

        res.status(200).json(feedback);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid feedback ID' });
        }
        console.error(err);
        return res.status(500).json({ error: 'Failed to retrieve feedback' });
    }
};

// Update a specific feedback by ID
const updateFeedbackById = async (req, res) => {
    const { opportunity_id, feedback_id } = req.params;
    const { rating, comment } = req.body;

    try {
        const feedback = await Feedback.findOneAndUpdate(
            {
                _id: feedback_id,
                opportunity: opportunity_id
            },
            { $set: { rating, comment } },
            { new: true } // Return the updated document
        );

        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }

        res.status(200).json(feedback);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid feedback ID' });
        }
        console.error(err);
        return res.status(500).json({ error: 'Failed to update feedback' });
    }
};

const deleteFeedbackById = async (req, res) => {
    const { feedback_id } = req.params;

    try {
        const feedback = await Feedback.findByIdAndDelete(feedback_id);

        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }

        res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid feedback ID' });
        }
        console.error(err);
        res.status(500).json({ error: 'Failed to delete feedback' });
    }
};

module.exports = {
    createFeedback,
    getAllFeedbacks,
    getFeedbackById,
    updateFeedbackById,
    deleteFeedbackById
};
