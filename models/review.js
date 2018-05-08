var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    // Review Data
    author: String,
    permlink: String,
    primaryTag: String,
    tags: [String],
    body: String,
    // Book Data
    bookTitle: String,
    bookAuthors: [String],
    rating: { type: Number, min: 0, max: 5 },
    ISBN: Number,
    coverImageUrl: String,
    quote: String
});

module.exports = mongoose.model('Review', reviewSchema);
