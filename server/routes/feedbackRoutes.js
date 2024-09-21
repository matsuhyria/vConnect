const express = require('express');
const router = express.Router();

const {
    createFeedback,
    getAllFeedbacks,
    getFeedbackById,
    updateFeedbackById,
    deleteFeedbackById
} = require('../controllers/feedbackController');

router.route('/api/v1/opportunities/:opportunity_id/feedbacks')
    .post(createFeedback)
    .get(getAllFeedbacks);

router.route('/api/v1/opportunities/:opportunity_id/feedbacks/:feedback_id')
    .get(getFeedbackById)
    .patch(updateFeedbackById)
    .put(updateFeedbackById)
    .delete(deleteFeedbackById);

module.exports = router;
