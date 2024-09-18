const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const feedack = new Schema({
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
