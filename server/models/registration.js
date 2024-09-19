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
    registrationDate: { 
        type: Date, 
        default: Date.now 
    },
    status: { 
        type: String, 
        enum: ['pending', 'confirmed', 'canceled'], 
        default: 'pending' 
    }
});

module.exports = mongoose.model("Registration", registration);
