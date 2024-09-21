const express = require("express");
const router = express.Router();

const { createUser, getUser, updateUser, deleteUser, loginUser } = require("../controllers/userController");

router.post('/api/v1/users', createUser);
router.post('/api/v1/users/login', loginUser);

router.route('/api/v1/users/:id')
    .get(getUser)
    .put(updateUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = router;
