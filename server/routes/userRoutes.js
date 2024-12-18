const express = require('express');
const router = express.Router();

const { BASE_PATH } = require('../helpers/constants');
const { createUser, createAdminUser, getUser, updateUser, deleteUser, loginUser } = require('../controllers/userController');
const verifyAccess = require('../middlewares/auth/verifyAccess');

// Define routes for creating a new user and logging in
router.post(`${BASE_PATH}/users`, createUser);
router.post(`${BASE_PATH}/users/admin`, createAdminUser);
router.post(`${BASE_PATH}/users/login`, loginUser);

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
