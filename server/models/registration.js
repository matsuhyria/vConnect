const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registration = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    opportunity: {
        type: Schema.Types.ObjectId,
        ref: 'Opportunity',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'no_show', 'canceled'],
        default: 'pending'
    }
});

registration.index({ user: 1, opportunity: 1 }, { unique: true }); // Ensures unique registrations for each user-opportunity pair
registration.index({ status: 1 });

module.exports = mongoose.model('Registration', registration);
