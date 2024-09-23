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
    .patch(updateRegistrationById)
    .put(updateRegistrationById)
    .delete(deleteRegistrationById);

router.route('/api/v1/registrations/:id')
    .get(getRegistrationById);
        

module.exports = router;
