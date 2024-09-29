const express = require('express');
const router = express.Router();

const { BASE_PATH } = require('../helpers/constants');
const {
    createRegistration,
    getAllUserRegistrations,
    getRegistrationById,
    getRegistrationsPerOpportunity,
    updateRegistrationById,
    deleteRegistrationById
} = require('../controllers/registrationController');
const verifyAccess = require('../middlewares/auth/verifyAccess');
const verifyRegistrationOwnership = require('../middlewares/auth/verifyRegistrationOwnership');


// Define routes for individual registrations
router.route(`${BASE_PATH}/registrations/:id`)
    // Retrieve a specific registration by ID
    .get(verifyAccess(), verifyRegistrationOwnership(), getRegistrationById)
    // Update an existing registration with the provided data (PUT request)
    .put(verifyAccess(), verifyRegistrationOwnership(), updateRegistrationById)
    // Partially update an existing registration with the provided data (PATCH request)
    .patch(verifyAccess(), verifyRegistrationOwnership(), updateRegistrationById)
    // Delete a specific registration by ID
    .delete(verifyAccess(), verifyRegistrationOwnership(), deleteRegistrationById);

// Routes for User Registrations
router.route(`${BASE_PATH}/registrations`)
    // Retrieve all registrations for a specific user
    .get(verifyAccess(), getAllUserRegistrations);


// Define routes for opportunities and registrations
router.route(`${BASE_PATH}/opportunities/:id/registrations`)
    // Create a new registration when the endpoint is hit with a POST request
    .post(verifyAccess(), createRegistration)
    // Retrieve all registrations for a given opportunity
    .get(verifyAccess(), getRegistrationsPerOpportunity);

module.exports = router;
