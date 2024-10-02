const express = require('express');
const router = express.Router();

const { BASE_PATH } = require('../helpers/constants');
const {
    createFeedback,
    getAllFeedbacks,
    getFeedbackById,
    updateFeedbackById,
    deleteFeedbackById
} = require('../controllers/feedbackController');


// Route for creating and reading all feedbacks related to an opportunity
router.route(`${BASE_PATH}/opportunities/:opportunity_id/feedbacks`)
    // POST request to create a new feedback
    .post(createFeedback)
    // GET request to retrieve all feedbacks associated with the specified opportunity
    .get(getAllFeedbacks);

// Route for reading, updating, and deleting individual feedback records
router.route(`${BASE_PATH}/opportunities/:opportunity_id/feedbacks/:feedback_id`)
    // GET request to read a specific feedback record
    .get(getFeedbackById)
    // PATCH request to partially update an existing feedback
    .patch(updateFeedbackById)
    // PUT request to fully update an existing feedback
    .put(updateFeedbackById)
    // DELETE request to remove a specific feedback record
    .delete(deleteFeedbackById);

module.exports = router;
