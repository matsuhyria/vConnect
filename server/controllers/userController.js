const { generateToken } = require('../helpers/jwt');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const addUser = async (password, name, email, type) => {
    const encryptedPassword = await bcrypt.hash(password.toString(), saltRounds);
    const user = new User({
        name, email, password: encryptedPassword, type
    });

    await user.save();
    return user;
};

const createUser = async (req, res) => {
    try {
        const { name, email, password, type } = req.body;

        if (type === 'admin') {
            res.status(400).json({ message: 'Invalid user type' });
        }

        const user = await addUser(password, name, email, type);

        // Generate JWT token
        const token = generateToken({ userId: user._id, email, type: user.type });

        res.status(201).json({ token, user: { id: user._id, email: user.email, type: user.type } });
    } catch (err) {
        console.error(err);
        return res.status(400).send({ message: err.message });
    }
};

const createAdminUser = async (req, res) => {
    try {
        const { name, email, password, type } = req.body;

        const adminExists = await User.findOne({ type: 'admin' });

        if (adminExists) {
            return res.status(409).json({ message: 'Admin exists!' });
        }

        if (type !== 'admin') {
            return res.status(400).json({ message: 'Invalid user type' });
        }

        const user = await addUser(password, name, email, type);

        // Generate JWT token
        const token = generateToken({ userId: user._id, email, type: user.type });

        res.status(201).json({ token, user: { id: user._id, email: user.email, type: user.type } });
    } catch (err) {
        console.error(err);
        return res.status(400).send({ message: err.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT token
        const token = generateToken({ userId: user._id, email, type: user.type });

        res.status(200).json({ message: 'Login successful', token, user: { id: user._id, email: user.email, type: user.type } });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error', err });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error', err });
    }
};

const updateUser = async (req, res) => {
    try {
        const { name, email, password, type } = req.body;

        if (type === 'admin') {
            res.status(400).json({ message: 'Invalid user type' });
        }

        const encryptedPassword = await bcrypt.hash(password.toString(), saltRounds);
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: { name, email, password: encryptedPassword, type } },
            { new: true }
        );

        if (!user) return res.status(404).json({ message: 'User not found' });

        // Generate JWT token
        const token = generateToken({ userId: user._id, email, type: user.type });

        res.status(200).json({ message: 'Update successful', token, user: { id: user._id, email: user.email, type: user.type } });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error', err });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted!', user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error', err });
    }
};

module.exports = { createUser, loginUser, getUser, updateUser, deleteUser, createAdminUser };
