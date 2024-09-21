const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String, enum: ['volunteer', 'organization_representative'], default: "volunteer"
    }
});

userSchema.index({ email: 1, type: 1 });

module.exports = mongoose.model("User", userSchema);
