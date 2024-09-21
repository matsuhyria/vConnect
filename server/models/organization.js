const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orgSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    managed_by: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
    }
});

orgSchema.index({ name: 1 });
orgSchema.index({ managed_by: 1 });

const Organization = mongoose.model('Organization', orgSchema);

module.exports = Organization;
