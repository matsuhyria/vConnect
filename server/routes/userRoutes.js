const express = require('express');
const router = express.Router();

const { BASE_PATH } = require('../helpers/constants');
const { createUser, createAdminUser, getUser, updateUser, deleteUser, loginUser, checkEmail } = require('../controllers/userController');
const verifyAccess = require('../middlewares/auth/verifyAccess');
// addUser('123', 'admin', 'admin@vconnect.com', 'admin');

// Define routes for creating a new user and logging in
router.post(`${BASE_PATH}/users`, createUser);
router.post(`${BASE_PATH}/users/admin`, createAdminUser);
router.post(`${BASE_PATH}/users/login`, loginUser);

// Define route for validating user email
router.get(`${BASE_PATH}/users/check-email`, checkEmail);

// Define routes for retrieving, updating, and deleting a specific user
router.route(`${BASE_PATH}/users/:id`)
    // Retrieve a user by their ID
    .get(verifyAccess({ checkOwnUser: true }), getUser)
    // Update a user's information
    .put(verifyAccess({ checkOwnUser: true }), updateUser)
    // Partially update a user's information
    .patch(verifyAccess({ checkOwnUser: true }), updateUser)
    // Delete a user
    .delete(verifyAccess({ checkOwnUser: true }), deleteUser);

module.exports = router;
