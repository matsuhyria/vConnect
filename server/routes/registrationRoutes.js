const express = require('express');
const router = express.Router();

const { BASE_PATH } = require('../helpers/constants');
const {
    createRegistration,
    getAllUserRegistrations,
    getRegistrationById,
    getRegistrationsPerOpportunity,
    updateRegistrationById,
    deleteRegistrationById,
    confirmAttendance
} = require('../controllers/registrationController');
const verifyAccess = require('../middlewares/auth/verifyAccess');
const verifyRegistrationOwnership = require('../middlewares/auth/verifyRegistrationOwnership');


// Define routes for individual registrations
router.route(`${BASE_PATH}/registrations/:id`)
    // Retrieve a specific registration by ID
    .get(verifyAccess({ requiredType: 'volunteer' }), verifyRegistrationOwnership(), getRegistrationById)
    // Update an existing registration with the provided data (PUT request)
    .put(verifyAccess({ requiredType: 'volunteer' }), verifyRegistrationOwnership(), updateRegistrationById)
    // Partially update an existing registration with the provided data (PATCH request)
    .patch(verifyAccess({ requiredType: 'volunteer' }), verifyRegistrationOwnership(), updateRegistrationById)
    // Delete a specific registration by ID
    .delete(verifyAccess({ requiredType: 'volunteer' }), verifyRegistrationOwnership(), deleteRegistrationById);

// Routes for User Registrations
router.route(`${BASE_PATH}/registrations`)
    // Retrieve all registrations for a specific user
    .get(verifyAccess({ requiredType: 'volunteer' }), getAllUserRegistrations);


// Define routes for opportunities and registrations
router.route(`${BASE_PATH}/opportunities/:id/registrations`)
    // Create a new registration when the endpoint is hit with a POST request
    .post(verifyAccess({ requiredType: 'volunteer' }), createRegistration)
    // Retrieve all registrations for a given opportunity
    .get(getRegistrationsPerOpportunity);

// POST /api/registration/confirm-attendance
router.route(`${BASE_PATH}/opportunities/:opportunityId/registrations/:id/confirm-attendance`)
    // confirm attendance
    .post(verifyAccess({ requiredType: 'volunteer' }), verifyRegistrationOwnership(), confirmAttendance);


module.exports = router;
