const express = require('express');
const router = express.Router();

const {
    createRegistration,
    getAllRegistrations,
    getRegistrationById,
    updateRegistrationById,
    deleteRegistrationById
} = require('../controllers/registrationController');

router.route('/api/v1/users/:user_id/opportunities/:opportunity_id/registrations')
    .post(createRegistration)
    .get(getAllRegistrations);

router.route('/api/v1/users/:user_id/opportunities/:opportunity_id/registrations/:id')
    .get(getRegistrationById)
    .patch(updateRegistrationById)
    .put(updateRegistrationById)
    .delete(deleteRegistrationById);

module.exports = router;
