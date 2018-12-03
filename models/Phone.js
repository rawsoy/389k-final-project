var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 0.0,
        max: 5.0,
        required: true,
    },
    comment: {
        type: String,
    },
    author: {
        type: String,
        required: true
    }
});

var phoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        min: 0,
        max: 2018,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    screenSize: {
        type: Number,
        required: true
    },
    reviews: [reviewSchema]
});

var Phone = mongoose.model('Phone', phoneSchema);

module.exports = Phone;
