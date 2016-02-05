var mongoose = require('mongoose');

var BandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    bio: {
        type: String
    },
    img: {
        type: String,
        required: true
    },
    dates: {
        type: Array,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    created_by: {
        type: String,
        required: true
    }
});



module.exports = mongoose.model('Band', BandSchema);
