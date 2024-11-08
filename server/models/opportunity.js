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
    status: { type: String, enum: ['active', 'canceled'], default: 'active' },
    address: {
        type: String,
        required: true,
    },
    organizationId: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
});

opportunitySchema.index({ date: 1 });
opportunitySchema.index({ status: 1 });
opportunitySchema.index({ organizationId: 1 });

module.exports = mongoose.model('Opportunity', opportunitySchema);
