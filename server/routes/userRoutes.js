const express = require("express");
const router = express.Router();

const { createUser, getUser, updateUser, deleteUser, loginUser } = require("../contollers/userController");

router.post("/api/v1/users", createUser);

router.post("/api/v1/users/login", loginUser);

router.get("/api/v1/users/:id", getUser);

router.put("/api/v1/users/:id", updateUser);

router.patch("/api/v1/users/:id", updateUser);

router.delete("/api/v1/users/:id", deleteUser);


module.exports = router;
