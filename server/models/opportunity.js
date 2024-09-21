const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const opportunitySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    date: {
        type: Date,
        required: true,
    },
    status: { type: String, enum: ['upcoming', 'ongoing', 'past', 'canceled'], default: "upcoming" },
    address: {
        type: String,
        required: true,
    },
    organizationId: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    }
});


module.exports = mongoose.model("Opportunity", opportunitySchema);
