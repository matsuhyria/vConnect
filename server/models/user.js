var mongoose = require('mongoose');

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
    },
    password: {
        type: String,
        required: true,
    },
    type: { type: String, enum: ['volunteer', 'organization_representative'], default: "volunteer" }
});


module.exports = mongoose.model("User", userSchema);
