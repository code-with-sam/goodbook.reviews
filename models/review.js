var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    title: String,
    ISBN: Number,
    coverImageUrl: String
});

module.exports = mongoose.model('Review', reviewSchema);
