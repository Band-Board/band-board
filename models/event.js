var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({

    bitId: {
        type: String,
    },

    title: {
        type: String
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
    artists: {
        type: Object
    },
    on_sale: {
        type: String
    },
    facebook_rsvp_url: {
        type: String
    },
    description: {
        type: String
    },
    venue: {
        type: Object
    }
});



module.exports = mongoose.model('Event', EventSchema);
