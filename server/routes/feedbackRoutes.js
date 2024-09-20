const express = require('express');
const router = express.Router();

const { 
    createFeedback, 
    getAllFeedbacks, 
    getFeedbackById, 
    updateFeedbackById, 
    deleteFeedbackById 
} = require('../controllers/feedbackController');

router.post('/api/v1/opportunities/:opportunity_id/feedbacks', createFeedback);
router.get('/api/v1/opportunities/:opportunity_id/feedbacks', getAllFeedbacks);
router.get('/api/v1/opportunities/:opportunity_id/feedbacks/:feedback_id', getFeedbackById);
router.patch('/api/v1/opportunities/:opportunity_id/feedbacks/:feedback_id', updateFeedbackById);
router.put('/api/v1/opportunities/:opportunity_id/feedbacks/:feedback_id', updateFeedbackById);
router.delete('/api/v1/opportunities/:opportunity_id/feedbacks/:feedback_id', deleteFeedbackById);

module.exports = router;
