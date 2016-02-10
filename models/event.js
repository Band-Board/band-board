var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({

    bitId: {
        type: String,
    },

    title: {
        type: String,
        required: true
    },
    datetime: {
        type: String
    },
    formatted_datetime: {
        type: String
    },
    formatted_location: {
        type: String
    },

    ticket_url: {
        type: String
    },
    ticket_type: {
        type: String
    },
    img: {
        type: String,
        required: true
    },
    on_sale_datetime: {
        type: String
    },
    facebook_rsvp_url: {
        type: String
    },
    description: {
        type: String
    },

    artists: {
        type: [String],
        required: true
    },
    venue: {
        type: String
    }
});



module.exports = mongoose.model('Event', EventSchema);
