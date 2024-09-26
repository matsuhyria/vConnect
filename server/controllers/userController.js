const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require("../models/user");

const createUser = async (req, res) => {
    try {
        const { name, email, password, type } = req.body;
        const encryptedPassword = await bcrypt.hash(password.toString(), saltRounds);
        const user = new User({
            name, email, password: encryptedPassword, type
        });
        await user.save();
        res.status(201).json({ message: "User created!", user });
    } catch (err) {
        console.error(err)
        return res.status(400).send({ message: err.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const session = { id: user.id }
        res.cookie('session', bcrypt.hashSync(JSON.stringify(session), saltRounds), {
            httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 24 * 60 * 60 * 1000 // 24 hour in milliseconds
        });

        res.status(200).json({ message: "Login successful", user });  // @TODO use jwt
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Server Error', err });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Server Error', err });
    }
};

const updateUser = async (req, res) => {
    try {
        const { name, email, password, type } = req.body;
        const encryptedPassword = await bcrypt.hash(password.toString(), saltRounds);
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: { name, email, password: encryptedPassword, type } },
            { new: true }
        );
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Server Error', err });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted!", user });
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Server Error', err });
    }
};

module.exports = { createUser, loginUser, getUser, updateUser, deleteUser };
