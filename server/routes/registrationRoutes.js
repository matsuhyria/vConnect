const express = require('express');
const router = express.Router();

const { 
    createRegistration, 
    getAllRegistrations, 
    getRegistrationById, 
    updateRegistrationById, 
    deleteRegistrationById 
} = require('../controllers/registrationController');

router.post('/api/v1/users/:user_id/opportunities/:opportunity_id/registrations', createRegistration);
router.get('/api/v1/users/:user_id/opportunities/:opportunity_id/registrations', getAllRegistrations);
router.get('/api/v1/users/:user_id/opportunities/:opportunity_id/registrations/:id', getRegistrationById);
router.patch('/api/v1/users/:user_id/opportunities/:opportunity_id/registrations/:id', updateRegistrationById);
router.put('/api/v1/users/:user_id/opportunities/:opportunity_id/registrations/:id', updateRegistrationById);
router.delete('/api/v1/users/:user_id/opportunities/:opportunity_id/registrations/:id', deleteRegistrationById);

module.exports = router;


