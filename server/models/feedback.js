const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedback = new Schema({
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
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        maxlength: 500
    }
});

feedback.index({ user: 1, opportunity: 1 }, { unique: true });

const Feedback = mongoose.model('Feedback', feedback);
module.exports = Feedback;
